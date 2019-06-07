import React from "react";
import styles from "../../styles/stylesForm";

import { TextInput, View, Text } from "react-native";

export default function RenderInput(props) {
  const {
    input,
    meta: { touched, error, warning },
    placeholder,
    ...inputProps
  } = props;

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
        style={[styles.textInput, error && styles.error]}
        onChangeText={input.onChange}
        onBlur={input.onBlur}
        onFocus={input.onFocus}
        value={input.value}
      />
      {touched &&
        ((error && <Text className="styles.textdanger">{error}</Text>) ||
          (warning && <Text className="styles.textwarning">{warning}</Text>))}
    </View>
  );
}
