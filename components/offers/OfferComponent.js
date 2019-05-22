import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { f } from "../../config/config";
import styles from "../../styles";
import uuid from "uuid";
import numeral from "numeral";
import DatePicker from "react-native-datepicker";
import Cards from "../posts/Cards";
import { Text, View, Image, TouchableOpacity, ScrollView } from "react-native";
import BidPrice from "./BidPrice";
import { postOffer } from "../../redux/actions/offer";

class OfferComponent extends React.Component {
  state = {
    uuid: uuid.v4(),
    time: this.props.marker.time,
    date: this.props.marker.date,
    offer: this.props.marker.offer.total,
    note: "",
    createdAt: new Date().toLocaleString()
  };

  submitOffer = () => {
    this.props.postOffer(this.state, this.props.marker, this.props.user);
  };

  render() {
    const { marker } = this.props;
    return (
      <View>
        <DatePicker
          style={{ width: 200 }}
          date={marker.date}
          mode="date"
          placeholder="select date"
          format="YYYY-MM-DD"
          minDate="2016-05-01"
          maxDate="2020-06-01"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: "absolute",
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 36
            }
            // ... You can check the source to find the other keys.
          }}
          onDateChange={date => {
            this.setState({ date: date });
          }}
        />

        <DatePicker
          style={{ width: 200 }}
          date={marker.time}
          mode="time"
          placeholder="select time"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          is24Hour={false}
          customStyles={{
            dateIcon: {
              position: "absolute",
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 36
            }
          }}
          onDateChange={time => {
            this.setState({ time: time });
          }}
        />

        <Text style={styles.bold}>{marker.time}</Text>

        <Text>
          {marker.arrangement} {marker.offer.hours} {marker.offer.rate}
        </Text>

        <BidPrice updateBid={offer => this.setState({ offer })} />

        <TouchableOpacity onPress={() => this.submitOffer()}>
          <Text style={styles.button}>Submit Offer</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

mapStateToProps = state => {
  return {
    user: state.profile.user
  };
};

mapDispatchToProps = dispatch => ({
  postOffer: (offer, post, user) => dispatch(postOffer(offer, post, user))
});

OfferComponent.propTypes = {
  time: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  offer: PropTypes.string.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OfferComponent);
