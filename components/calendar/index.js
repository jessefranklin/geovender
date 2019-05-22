import React, { Component } from "react";
import { StyleSheet, StatusBar, View } from "react-native";
import moment from "moment";
import Calendar from "./cal/Calendar";
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
const filterEvents = date =>
  FAKE_EVENTS.filter(event => event.date.isSame(date, "day"));

export default class Schedule extends Component {
  state = {
    events: filterEvents(moment())
  };

  onSelectDate = date => {
    this.setState({ events: filterEvents(date) });
  };

  render() {
    const { events } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <Calendar onSelectDate={this.onSelectDate} />
        <Events events={events} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3F53B1",
    paddingTop: 20
  }
});
