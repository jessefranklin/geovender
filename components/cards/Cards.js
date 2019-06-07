import React, { Component } from "react";
import moment from "moment";
import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  StyleSheet
} from "react-native";

const Dimensions = require("Dimensions");
const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;
var styles = StyleSheet.create({
  card: {
    width: deviceWidth,
    height: deviceHeight * 0.4
  },
  cardDescription: {
    padding: 15,
    justifyContent: "flex-end",
    flex: 1
  },
  cardInfo: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10
  }
});

class Cards extends Component {
  state = {
    num: 0
  };

  nextPhoto() {
    var num = this.state.num;
    var length = this.props.images.length - 1;
    if (num >= length) {
      this.setState({ num: 0 });
    } else {
      num += 1;
      this.setState({ num: num });
    }
  }

  render() {
    const { meta, offer, date } = this.props;
    return (
      <TouchableOpacity onPress={() => this.nextPhoto()}>
        <ImageBackground
          style={styles.card}
          source={{ uri: this.props.images[this.state.num] }}
        >
          {this.props.showDescription === true && (
            <View style={styles.cardDescription}>
              <View style={styles.cardInfo}>
                <Text style={styles.bold}>{offer.total}</Text>
                <Text style={styles.bold}>
                  Request Type: {date.fulfillmentType}{" "}
                  {moment(date.startDate).format("MMM DD")} at
                  {date.startTime}
                </Text>
              </View>
            </View>
          )}
        </ImageBackground>
      </TouchableOpacity>
    );
  }
}

export default Cards;
