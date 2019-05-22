import React from "react";
import { TextInput, View, Text } from "react-native";
import moment from "moment";
import DatePicker from "react-native-datepicker";
import styles from "../../styles/stylesForm";

export default function RenderDate(props) {
  const { input, meta, ...inputProps } = props;

  return (
    <>
      <DatePicker
        style={[styles.datePicker]}
        customStyles={{ borderColor: "#fff" }}
        date={input.value}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        showIcon={false}
        minDate={moment().format("YYYY-MM-DD")}
        maxDate={moment()
          .add(14, "days")
          .format("YYYY-MM-DD")}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        onDateChange={value => input.onChange(value)}
      />
    </>
  );
}
