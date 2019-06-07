import React, { Component } from "react";
import { connect } from "react-redux";
import { formValueSelector, reduxForm } from "redux-form";
import styles from "../../styles/stylesForm";
import { Text, View, Alert } from "react-native";
import { Field } from "redux-form";
import RenderNumInput from "../formEl/RenderNumInput";
import RenderButtonGroup from "../formEl/RenderButtonGroup";
import { postDraft } from "../../redux/actions/post";

const component1 = () => <Text>Flat Rate</Text>;
const component2 = () => <Text>Hourly</Text>;

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
    const { arrangement, rate, hours } = this.props;

    const buttons = [{ element: component1 }, { element: component2 }];
    const selectedIndex = 0;

    return (
      <View style={[styles.container, styles.formContainer]}>
        <Text style={styles.h3}>Offering</Text>
        <Field
          name="offer.arrangement"
          value={selectedIndex}
          buttons={buttons}
          component={RenderButtonGroup}
        />

        <View style={styles.dateRow}>
          <Field
            style={styles.rateInput}
            name="offer.hours"
            placeholder="Hours"
            component={RenderNumInput}
            type="number"
          />
          <Field
            style={styles.rateInput}
            name="offer.rate"
            placeholder="Rate"
            component={RenderNumInput}
            type="number"
          />
        </View>

        {arrangement === 0 ? (
          <Text style={styles.totalOffer}>
            {rate !== undefined && hours !== undefined
              ? `Flat Rate ${rate} for ${hours} hours`
              : null}
          </Text>
        ) : (
          <View>
            {(rate !== undefined) & (hours !== undefined) ? (
              <View>
                <Text>
                  `Hourly $${rate} * ${hours}`
                </Text>
                <Text style={styles.totalOffer}>${rate * hours}</Text>
              </View>
            ) : null}
          </View>
        )}
      </View>
    );
  }
}

PostFormOffer = reduxForm({
  form: "post"
})(PostFormOffer);

const selector = formValueSelector("post");

PostFormOffer = connect(state => {
  return {
    arrangement: selector(state, "offer.arrangement"),
    rate: selector(state, "offer.rate"),
    hours: selector(state, "offer.hours")
  };
})(PostFormOffer);

export default PostFormOffer;
