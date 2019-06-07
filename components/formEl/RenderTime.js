import React from "react";
import { View } from "react-native";
import moment from "moment";
import DatePicker from "react-native-datepicker";
import styles from "../../styles/stylesForm";

export default function RenderDate(props) {
  const { input, meta, ...inputProps } = props;

  const formStates = [
    "active",
    "autofilled",
    "asyncValidating",
    "dirty",
    "invalid",
    "pristine",
    "submitting",
    "touched",
    "valid",
    "visited"
  ];

  return (
    <>
      <DatePicker
        style={[styles.datePicker]}
        date={input.value}
        mode="time"
        showIcon={false}
        placeholder="Select time"
        confirmBtnText="Confirm"
        minuteInterval={15}
        format="h:mm a"
        cancelBtnText="Cancel"
        onDateChange={value => input.onChange(value)}
      />
    </>
  );
}
