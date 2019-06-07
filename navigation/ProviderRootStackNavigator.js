import React from "react";
import styles from "../styles";
import ProfileDetails from "../screens/profile/ProfileDetails";
import Settings from "../screens/profile/Settings";
import Account from "../screens/profile/Account";
import { createStackNavigator } from "react-navigation";
import { ProviderBaseNavigator } from "./ProviderBaseNavigator";
import ViewPosting from "../screens/provider/ViewPosting";

import { fromTop, fromBottom, fromRight } from "react-navigation-transitions";

const handleCustomTransition = ({ scenes }) => {
  const prevScene = scenes[scenes.length - 2];
  const nextScene = scenes[scenes.length - 1];

  if (
    prevScene &&
    prevScene.route.routeName === "AddPosting" &&
    nextScene.route.routeName === "PreviewPost"
  ) {
    return fromRight();
  }
  return fromBottom();
};

export const ProviderRootStackNavigator = createStackNavigator(
  {
    Main: {
      screen: ProviderBaseNavigator,
      navigationOptions: {
        header: null
      }
    },
    ProfileDetails: {
      screen: ProfileDetails
    },
    Settings: {
      screen: Settings
    },
    Account: {
      screen: Account
    },
    ViewPost: {
      screen: ViewPosting
    }
  },
  {
    initializeRouteName: "Main",
    mode: "modal"
  }
);
