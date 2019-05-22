import React, { Component } from "react";
import { connect } from "react-redux";
import { formValueSelector, reduxForm } from "redux-form";
import styles from "../../styles/stylesForm";
import { Text, View, Alert } from "react-native";
import { Field } from "redux-form";
import RenderNumInput from "../formEl/RenderNumInput";
import RenderCheckbox from "../formEl/RenderCheckbox";
import { postDraft } from "../../redux/actions/post";

export class PostFormOffer extends Component {
  constructor(props) {
    super(props);

    this.initialState = {
      rate: "",
      hours: ""
    };

    this.state = {
      ...this.initialState
    };
  }

  handleSubmit = () => {
    const { hourlyRate, hoursPerWeek } = this.state;

    if (!parseFloat(hourlyRate) || !parseFloat(hoursPerWeek)) {
      Alert.alert("Input error", "Please input some positive numeric values.");
      return;
    }

    const annualIncome = Math.abs(
      parseFloat(hourlyRate) * parseFloat(hoursPerWeek) * 52
    );
  };

  render() {
    const { arrangement, rate, hours, total } = this.props;
    return (
      <View style={[styles.container, styles.formContainer]}>
        <Text style={styles.h3}>Offering</Text>
        <Field
          name="arrangement"
          label="Flat Rate"
          component={RenderCheckbox}
        />
        <Field name="arrangement" label="Hourly" component={RenderCheckbox} />
        <View>
          <Field
            style={styles.rateInput}
            name="hours"
            placeholder="Hours"
            component={RenderNumInput}
            type="number"
          />
          <Field
            style={styles.rateInput}
            name="rate"
            placeholder="Rate"
            component={RenderNumInput}
            type="number"
          />
        </View>

        {arrangement ? (
          <Text style={styles.totalOffer}>
            {rate !== 0 && `Flat Rate ${rate} for ${hours} hours`}
          </Text>
        ) : (
          <Text style={styles.totalOffer}>
            {total !== 0 && ` Hourly $${rate} * ${hours} ${total}`}
          </Text>
        )}
      </View>
    );
  }
}

PostFormOffer = reduxForm({
  form: "post.offer",
  initialValues: {
    arrangement: false,
    rate: "0",
    hours: "0"
  }
})(PostFormOffer);

const selector = formValueSelector("post.offer");

PostFormOffer = connect(state => {
  const { arrangement, rate, hours } = selector(
    state,
    "arrangement",
    "rate",
    "hours"
  );
  return {
    arrangement,
    rate,
    hours,
    total: rate * hours
  };
})(PostFormOffer);

export default PostFormOffer;
