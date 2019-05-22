import React from "react";
import styles from "../../styles/stylesForm";

import { TextInput, View, Text } from "react-native";

export default function RenderInput(props) {
  const { input, meta, placeholder, ...inputProps } = props;

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
    <View>
      <TextInput
        {...inputProps}
        name={input.name}
        placeholder={placeholder}
        style={[styles.textInput]}
        keyboardType="numeric"
        onChangeText={input.onChange}
        onBlur={input.onBlur}
        onFocus={input.onFocus}
        value={input.value}
      />
    </View>
  );
}
