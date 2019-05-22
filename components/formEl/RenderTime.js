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
        date={input.value || moment()}
        mode="time"
        showIcon={false}
        placeholder="Select time"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        onDateChange={value => input.onChange(value)}
      />
    </>
  );
}
