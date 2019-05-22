import React, { useState } from "react";
import styles from "../../styles";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input } from "react-native-elements";
import RangeSlider from "react-native-range-slider";

import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Slider
} from "react-native";

const BidPrice = ({ price, updateBid }) => (
  <View style={{ flex: 1, flexDirection: "row" }}>
    <Slider
      style={{ width: 300 }}
      step={1}
      minimumValue={30}
      maximumValue={80}
      value={50}
      onValueChange={val => console.log(val)}
      thumbTintColor="rgb(252, 228, 149)"
      maximumTrackTintColor="#d3d3d3"
      minimumTrackTintColor="rgb(252, 228, 149)"
    />
  </View>
);

export default BidPrice;
