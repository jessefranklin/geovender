import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { ListItem } from "react-native-elements";

const list = [
  {
    title: "ProfileDetails",
    icon: "card-travel"
  },
  {
    title: "Settings",
    icon: "settings"
  },
  {
    title: "Account",
    icon: "account-balance"
  }
];

const ProfileOptions = props => {
  return (
    <View>
      {list.map((item, i) => (
        <ListItem
          key={i}
          title={item.title}
          onPress={() => props.navigate(item.title)}
          leftIcon={{ name: item.icon }}
        />
      ))}
    </View>
  );
};

export default ProfileOptions;
