import React, { Component } from "react";

import { Field } from "redux-form";
import styles from "../../styles/stylesForm";

import RenderInput from "../formEl/RenderInput";
import RenderSelect from "../formEl/RenderSelect";
import { Text, View } from "react-native";

const category = [
  { value: "General", label: "General" },
  { value: "Moving", label: "Moving" },
  { value: "Lawn Care", label: "Lawn Care" },
  { value: "Labour", label: "Labour" },
  { value: "Cleaning", label: "Cleaning" }
];

export class PostFormMeta extends Component {
  render() {
    return (
      <View style={[styles.container, styles.formContainer]}>
        <Text style={styles.h3}>Job Description</Text>
        <Field
          name="title"
          component={RenderInput}
          placeholder={"Title"}
          type="text"
        />
        <Field
          name="subtitle"
          placeholder={"Sub Title"}
          component={RenderInput}
          type="text"
        />
        <Field
          name="description"
          placeholder={"Description"}
          component={RenderInput}
          type="text"
        />
        <Field
          name="serviceCategory"
          component={RenderSelect}
          options={category}
          type="text"
        />
        <Field
          name="serviceName"
          placeholder={"Service Name"}
          component={RenderInput}
          type="text"
        />
      </View>
    );
  }
}
