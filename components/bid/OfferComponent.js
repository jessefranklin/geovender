import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "../../styles/stylesForm";

import DatePicker from "react-native-datepicker";
import { Text, View, TouchableOpacity } from "react-native";

import BidPrice from "./BidPrice";
import { postOffer } from "../../redux/actions/offer";

class OfferComponent extends React.Component {
  state = {
    status: "pending",
    time: this.props.marker.dateTime.startTime,
    date: this.props.marker.dateTime.startDate,
    offer: this.props.marker.offer.total,
    note: "",
    createdAt: new Date().toLocaleString()
  };

  preview = false;

  submitOffer = () => {
    var self = this;
    this.props
      .postOffer(this.state, this.props.marker, this.props.user)
      .then(() => {
        this.props.navigation.navigate("Offers");
      });
  };

  render() {
    const { marker } = this.props;
    const { time, date, offer } = this.state;
    return (
      <View style={styles.offerContainer}>
        <View style={styles.dateRow}>
          <DatePicker
            date={date}
            style={[styles.datePicker]}
            customStyles={{ borderColor: "#fff" }}
            mode="date"
            placeholder="select date"
            format="YYYY-MM-DD"
            minDate={marker.dateTime.startDate}
            maxDate={marker.dateTime.endDate ? marker.dateTime.endDate : null}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            showIcon={false}
            onDateChange={date => {
              this.setState({ date: date });
            }}
          />

          <DatePicker
            date={time}
            customStyles={{ borderColor: "#fff" }}
            style={[styles.datePicker]}
            mode="time"
            placeholder="select time"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            is24Hour={false}
            minuteInterval={15}
            format="h:mm a"
            showIcon={false}
            onDateChange={time => {
              this.setState({ time: time });
            }}
          />
        </View>

        <BidPrice
          offer={offer}
          updateBid={offer => this.setState({ offer: offer.value })}
        />

        <Button
          onPress={() => this.submitOffer()}
          iconRight
          title="Submit Offer"
        />
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
  // time: PropTypes.string.isRequired,
  // date: PropTypes.string.isRequired,
  // offer: PropTypes.string.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OfferComponent);
