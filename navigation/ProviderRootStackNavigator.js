import React from "react";
import styles from "../styles";

import { createStackNavigator } from "react-navigation";
import { ProviderBaseNavigator } from "./ProviderBaseNavigator";
import ViewPost from "../screens/provider/ViewPost";
import CliPostDetail from "../components/offers/CliPostDetail";

export const ProviderRootStackNavigator = createStackNavigator(
  {
    Main: {
      screen: ProviderBaseNavigator,
      navigationOptions: {
        header: null
      }
    },
    ViewPost: {
      screen: ViewPost
    }
  },
  {
    initializeRouteName: "Main",
    mode: "modal"
  }
);
