import React from "react";
import { Text, View } from "react-native";
import styles from "../../styles/stylesForm";
import { ButtonGroup } from "react-native-elements";

export default function RenderButtonGroup(props) {
  const { buttons, input } = props;
  return (
    <View>
      <ButtonGroup
        onPress={value => input.onChange(value)}
        selectedIndex={input.value || 0}
        buttons={buttons}
        containerStyle={{ height: 40 }}
      />
    </View>
  );
}
