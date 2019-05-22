import React from "react";
import styles from "../styles";

import { createStackNavigator } from "react-navigation";
import { ClientBaseNavigator } from "./ClientBaseNavigator";
import ClientViewPost from "../screens/client/ClientViewPost";
import AddPosting from "../screens/client/AddPosting";

export const ClientRootStackNavigator = createStackNavigator(
  {
    Main: {
      screen: ClientBaseNavigator,
      navigationOptions: {
        header: null
      }
    },
    CliViewPost: {
      screen: ClientViewPost
    },
    AddPosting: {
      screen: AddPosting
    }
  },
  {
    initializeRouteName: "Main",
    mode: "modal"
  }
);
