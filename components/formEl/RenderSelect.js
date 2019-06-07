import React from "react";
import { Text, View } from "react-native";
import styles from "../../styles/stylesForm";

import SelectInput from "react-native-select-input-ios";

export default function RenderSelect(props) {
  const { options, input } = props;
  return (
    <View>
      <SelectInput
        value={input.value || 0}
        options={options}
        onCancelEditing={() => console.log("onCancel")}
        onSubmitEditing={value => input.onChange(value)}
        style={styles.selectInput}
      />
    </View>
  );
}
