import React from "react";
import {
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
import { TouchableWithoutFeedback } from "react-native";

import { View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Badge, withBadge } from "react-native-elements";

import ViewOverflow from "react-native-view-overflow";
import AddButton from "../components/common/AddButton";
import Posts from "../screens/client/Posts";
import Profile from "../screens/client/Profile";
import PostManagerScreen from "../screens/client/PostManagerScreen";

const ClientBaseNavigator = createBottomTabNavigator(
  {
    Profile: {
      screen: Profile,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <Icon name="user" color={tintColor} size={24} />
        )
      })
    },
    Adding: {
      screen: () => null,
      navigationOptions: () => ({
        tabBarIcon: <AddButton />
      })
    },
    Posts: {
      screen: Posts,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <Icon name="bars" color={tintColor} size={24} />
        )
      })
    },
    Offers: {
      screen: PostManagerScreen,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon name="stack-exchange" color={tintColor} size={24} />
            <Badge
              value="9"
              status="error"
              containerStyle={{ position: "absolute", top: -4, right: -16 }}
            />
          </View>
        )
      })
    }
  },
  {
    tabBarComponent: props => {
      const {
        navigation: {
          state: { index, routes }
        },
        style,
        activeTintColor,
        inactiveTintColor,
        renderIcon,
        jumpTo
      } = props;

      return (
        <ViewOverflow
          style={{
            flexDirection: "row",
            height: 50,
            width: "100%",
            ...style
          }}
        >
          {routes.map((route, idx) => (
            <ViewOverflow
              key={route.key}
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <TouchableWithoutFeedback onPress={() => jumpTo(route.key)}>
                {renderIcon({
                  route,
                  focused: index === idx,
                  tintColor: index === idx ? activeTintColor : inactiveTintColor
                })}
              </TouchableWithoutFeedback>
            </ViewOverflow>
          ))}
        </ViewOverflow>
      );
    },
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

const defaultGetStateForAction = ClientBaseNavigator.router.getStateForAction;

// BaseNavigator.router.getStateForAction = (action, state) => {
//     if (action.type === NavigationActions.NAVIGATE && action.routeName === 'Adding') {
//         return null;
//     }
//
//     return defaultGetStateForAction(action, state);
// };

export { ClientBaseNavigator };
