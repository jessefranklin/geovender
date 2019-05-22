import React, { Component } from "react";
import styles from "../../styles/stylesForm";

import { Field } from "redux-form";
import RenderInput from "../formEl/RenderInput";
import { Text, View } from "react-native";

export class PostFormLocation extends Component {
  render() {
    return (
      <View style={[styles.container, styles.formContainer]}>
        <Text style={styles.h3}>Location</Text>
        <Field
          name="streetName"
          placeholder={"Street"}
          component={RenderInput}
          type="text"
        />
        <Field
          name="city"
          placeholder={"City"}
          component={RenderInput}
          type="text"
        />
        <Field
          name="zipCode"
          placeholder={"Postal Code"}
          component={RenderInput}
          type="text"
        />
      </View>
    );
  }
}

PostFormLocation.defaultProps = {
  name: "address"
};
