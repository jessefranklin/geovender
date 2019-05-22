import React from "react";
import { View } from "react-native";
import { ListItem } from "react-native-elements";

const list = [
  {
    title: "Profile",
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

const ProfileOptions = () => {
  return (
    <View>
      {list.map((item, i) => (
        <ListItem key={i} title={item.title} leftIcon={{ name: item.icon }} />
      ))}
    </View>
  );
};

export default ProfileOptions;
