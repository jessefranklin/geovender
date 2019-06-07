import React, { Component } from "react";
import styles from "../../styles";

import { Text, View, TextInput } from "react-native";
import { Button, Icon } from "react-native-elements";
import NumericInput from "react-native-numeric-input";
import numeral from "numeral";
const Dimensions = require("Dimensions");
const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

class BidPrice extends Component {
  state = {
    value: this.props.price || 1
  };
  increment = () => {
    this.setState({ price: this.state.price + 1 });
  };
  decrease = () => {
    if (this.state.price == 1) return;
    this.setState({ price: this.state.price - 1 });
  };
  render() {
    const { price } = this.state;
    const { offer, updateBid } = this.props;
    const parsedOffer = parseInt(offer);
    return (
      <View style={{}}>
        <NumericInput
          value={parsedOffer}
          onChange={value => updateBid({ value })}
          onLimitReached={(isMax, msg) => console.log(isMax, msg)}
          totalWidth={deviceWidth * 0.8}
          totalHeight={50}
          iconSize={25}
          step={1}
          valueType="real"
          rounded
          textColor="#333"
          iconStyle={{ color: "white" }}
          rightButtonBackgroundColor="#555"
          leftButtonBackgroundColor="#555"
        />

        <Text>{numeral(parsedOffer).format("$0,0.00")}</Text>
      </View>
    );
  }
}

export default BidPrice;
