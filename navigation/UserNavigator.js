import React from "react";

import { createSwitchNavigator } from "react-navigation";
import { ClientRootStackNavigator } from "./ClientRootStackNavigator";
import { ProviderRootStackNavigator } from "./ProviderRootStackNavigator";

export const UserNavigator = createSwitchNavigator(
  {
    Client: {
      screen: ClientRootStackNavigator
    },
    Provider: {
      screen: ProviderRootStackNavigator
    }
  },
  {
    initializeRouteName: "Provider",
    headerMode: "none"
  }
);
