import React, { Component } from "react";
import { connect } from "react-redux";
import { Text, View } from "react-native";
import { Field, reduxForm, formValueSelector, change } from "redux-form";
import moment from "moment";
import styles from "../../styles/stylesForm";

import RenderDate from "../formEl/RenderDate";
import RenderTime from "../formEl/RenderTime";
import RenderSelect from "../formEl/RenderSelect";
import RenderCheckbox from "../formEl/RenderCheckbox";

const options = [
  { value: "ASAP", label: "ASAP" },
  { value: "Firm", label: "Firm Date & Time" },
  { value: "Flexible", label: "Flexible Date & Time" },
  { value: "Between", label: "Anytime Between" }
];

export class PostFormDate extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.fulfillment === "Between") {
      this.props.dispatch(
        change(
          "post",
          "dateTime.endDate",
          moment()
            .add(1, "days")
            .format("YYYY-MM-DD")
        )
      );
    } else {
      this.props.dispatch(change("post", "dateTime.endDate", ""));
    }
  }

  render() {
    const { fulfillment } = this.props;

    return (
      <View style={[styles.container, styles.formContainer]}>
        <Text style={styles.h3}>Date &amp; Time</Text>
        <Field
          name="dateTime.fulfillmentType"
          component={RenderSelect}
          options={options}
          placeholder={"Select "}
          type="text"
        />

        <View style={styles.dateRow}>
          <Field name="dateTime.startDate" component={RenderDate} type="text" />
          <Field name="dateTime.startTime" component={RenderTime} type="text" />
        </View>

        {fulfillment === "Between" && (
          <View style={styles.dateRow}>
            <Field name="dateTime.endDate" component={RenderDate} type="text" />
            <Field name="dateTime.endTime" component={RenderTime} type="text" />
          </View>
        )}

        <Field
          name="dateTime.flexible"
          label="Flexible"
          component={RenderCheckbox}
          type="text"
        />
      </View>
    );
  }
}

PostFormDate = reduxForm({
  form: "post"
})(PostFormDate);

const selector = formValueSelector("post");

PostFormDate = connect(state => {
  return {
    fulfillment: selector(state, "dateTime.fulfillmentType"),
    flexible: selector(state, "dateTime.flexible")
  };
})(PostFormDate);

export default PostFormDate;
