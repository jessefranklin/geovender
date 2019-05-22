import React, { Component } from "react";
import { connect } from "react-redux";
import { Text, View } from "react-native";
import { Field, reduxForm, formValueSelector } from "redux-form";
import moment from "moment";
import styles from "../../styles/stylesForm";

import RenderDate from "../formEl/RenderDate";
import RenderTime from "../formEl/RenderTime";
import RenderSelect from "../formEl/RenderSelect";
import RenderCheckbox from "../formEl/RenderCheckbox";

const options = [
  { value: "ASAP", label: "ASAP" },
  { value: "Firm Date Time", label: "Firm Date & Time" },
  { value: "Between", label: "Anytime Between" }
];

export class PostFormDate extends Component {
  render() {
    const { fulfillmentType } = this.props;
    return (
      <View style={[styles.container, styles.formContainer]}>
        <Text style={styles.h3}>Date &amp; Time</Text>
        <Field
          name="fulfillmentType"
          component={RenderSelect}
          options={options}
          placeholder={"Select "}
          type="text"
        />
        <View>
          <Field name="startDate" component={RenderDate} type="text" />
          <Field name="startTime" component={RenderTime} type="text" />
        </View>

        {/* <Field name="dateFlexable" component={RenderCheckbox} type="text" /> */}
        {fulfillmentType === "Between" && (
          <View style={styles.dateRow}>
            <Field name="endDate" component={RenderDate} type="text" />
            <Field name="endTime" component={RenderTime} type="text" />
          </View>
        )}
      </View>
    );
  }
}

PostFormDate = reduxForm({
  form: "post.dateTime",
  initialValues: {
    fulfillmentType: "ASAP",
    startDate: moment(),
    startTime: moment()
  }
})(PostFormDate);

const selector = formValueSelector("post.dateTime");

PostFormDate = connect(state => {
  const fulfillmentType = selector(state, "fulfillmentType");

  return {
    fulfillmentType
  };
})(PostFormDate);

export default PostFormDate;
