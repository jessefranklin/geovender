import React from "react";
import styles from "../styles";

import { createStackNavigator } from "react-navigation";
import { ClientBaseNavigator } from "./ClientBaseNavigator";
import ClientViewPost from "../screens/client/ClientViewPost";
import AddPosting from "../screens/client/AddPosting";
import ProfileDetails from "../screens/profile/ProfileDetails";
import Settings from "../screens/profile/Settings";
import Account from "../screens/profile/Account";
import PreviewPost from "../screens/client/PreviewPost";
import { fromTop, fromBottom, fromRight } from "react-navigation-transitions";

const handleCustomTransition = ({ scenes }) => {
  const prevScene = scenes[scenes.length - 2];
  const nextScene = scenes[scenes.length - 1];

  if (
    (prevScene &&
      prevScene.route.routeName === "AddPosting" &&
      nextScene.route.routeName === "PreviewPost") ||
    nextScene.route.routeName === "Settings" ||
    nextScene.route.routeName === "Account" ||
    nextScene.route.routeName === "ProfileDetails"
  ) {
    return fromRight();
  }
  return fromBottom();
};

export const ClientRootStackNavigator = createStackNavigator(
  {
    Main: {
      screen: ClientBaseNavigator,
      navigationOptions: {
        header: null
      }
    },
    ClientViewPost: {
      screen: ClientViewPost
    },
    AddPosting: {
      screen: AddPosting
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
    PreviewPost: {
      screen: PreviewPost,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    initializeRouteName: "Main",
    mode: "modal",
    transitionConfig: nav => handleCustomTransition(nav)
  }
);
