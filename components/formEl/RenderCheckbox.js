import React from "react";
import { TextInput, View, Text } from "react-native";
import { CheckBox } from "react-native-elements";

const RenderCheckbox = ({ input, label }) => {
  return (
    <View>
      <CheckBox
        title={label}
        checked={input.value ? true : false}
        onPress={() => input.onChange(!input.value)}
      />
    </View>
  );
};

export default RenderCheckbox;
