import React from "react";
import styles from "../../styles";
import { connect } from "react-redux";
import OfferList from "../../components/offers/OfferList";
import Schedule from "../../components/calendar/";
import { fetchProfileOffers } from "../../redux/actions/offer";
import { Text, View, ScrollView } from "react-native";

class ScheduleScreen extends React.Component {
  state = {};

  componentDidMount() {
    this.props.fetchProfileOffers();
  }

  componentWillReceiveProps(nextProps) {}

  render() {
    return (
      <ScrollView>
        <View style={[styles.container]}>
          <View>
            <Schedule />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchProfileOffers: () => dispatch(fetchProfileOffers())
});

export default connect(
  undefined,
  mapDispatchToProps
)(ScheduleScreen);
