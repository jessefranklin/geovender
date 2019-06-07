import React, { Component } from "react";
import styles from "../../styles";
import { View, StyleSheet, Button, TextInput } from "react-native";

export const PostFormPayment = ({ state, onChange }) => (
  <View style={styles.container}>
    <Text style={styles.bold}>Payment</Text>
    <SwitchComp
      fval={this.state.arrangement}
      sw={val => this.flatOrHour(val)}
    />
    <Text>{this.state.arrangement}</Text>
    {this.nestedNumericField("hours", "Hours", "offer")}
    {this.nestedNumericField("rate", "Rate", "offer")}
    <Text>Total: {total}</Text>
  </View>
);
