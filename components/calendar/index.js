import React, { Component } from "react";
import { connect } from "react-redux";
import { StyleSheet, StatusBar, View, Text } from "react-native";
import moment from "moment";
import { filterForEvents } from "../../selectors/filterForEvents";
import Calendar from "./cal/Calendar";
import _ from "lodash";
import Events from "./events/Events";

const FAKE_EVENTS = [
  {
    date: moment()
      .add(4, "days")
      .clone(),
    title: "name",
    description: "description",
    image: "url"
  },
  {
    date: moment()
      .add(4, "hours")
      .clone(),
    title: "name",
    description: "description",
    image: "url"
  }
];

// Filter events by date
const filterEvents = (events, date) => {
  // events.filter(event => console.log(moment(event.date).isSame(date, "day")));
  let dayEvents = _.filter(events, event => {
    if (moment(event.date).isSame(date, "day")) {
      return event;
    }
  });
  return dayEvents;
  // return events.filter(event => moment(event.date).isSame(date, "day"));
};

class Schedule extends Component {
  state = {
    events: filterEvents(this.props.events, moment())
  };

  onSelectDate = date => {
    this.setState({ events: filterEvents(this.props.events, date) });
  };

  render() {
    const { events } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar hidden={false} />
        <Calendar onSelectDate={this.onSelectDate} />
        <Events events={events} />
      </View>
    );
  }
}

mapStateToProps = state => {
  return {
    events: filterForEvents(state.profileOffers)
  };
};

export default connect(mapStateToProps)(Schedule);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3F53B1",
    paddingTop: 20
  }
});
