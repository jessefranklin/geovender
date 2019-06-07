import React from "react";
import {
  createBottomTabNavigator,
  createMaterialTopTabNavigator
} from "react-navigation";
import Icon from "react-native-vector-icons/FontAwesome";
import { Badge, withBadge } from "react-native-elements";
import { View } from "react-native";

import MapView from "../screens/provider/MapView";
import ProviderProfile from "../screens/provider/ProviderProfile";
import Deck from "../screens/provider/DeckScreen";
import LikedPosts from "../screens/provider/LikedPosts";
import OffersScreen from "../screens/provider/OffersScreen";
import ScheduleScreen from "../screens/provider/ScheduleScreen";

const ProviderBaseNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: createMaterialTopTabNavigator(
        {
          Deck: {
            screen: Deck
          },
          Home: {
            screen: MapView
          }
        },
        {
          initialRouteName: "Home",
          headerMode: "none"
        }
      ),
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon name="location-arrow" color={tintColor} size={24} />
          </View>
        )
      })
    },
    Saved: {
      screen: LikedPosts,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <Icon name="bookmark" color={tintColor} size={24} />
        )
      })
    },
    Offers: {
      screen: OffersScreen,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon name="tag" color={tintColor} size={24} />
            <Badge
              value="99"
              status="error"
              containerStyle={{ position: "absolute", top: -4, right: -16 }}
            />
          </View>
        )
      })
    },
    Calendar: {
      screen: ScheduleScreen,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <Icon name="calendar" color={tintColor} size={24} />
        )
      })
    },
    Profile: {
      screen: ProviderProfile,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <Icon name="user" color={tintColor} size={24} />
        )
      })
    }
  },
  {
    initialRouteName: "Home",
    tabBarOptions: {
      showLabel: false,
      activeTintColor: "#F8F8F8",
      inactiveTintColor: "#586589",
      style: {
        backgroundColor: "#171F33"
      },
      tabStyle: {}
    }
  }
);

const defaultGetStateForAction = ProviderBaseNavigator.router.getStateForAction;

// BaseNavigator.router.getStateForAction = (action, state) => {
//     if (action.type === NavigationActions.NAVIGATE && action.routeName === 'Adding') {
//         return null;
//     }
//
//     return defaultGetStateForAction(action, state);
// };

export { ProviderBaseNavigator };
