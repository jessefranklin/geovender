import React from "react";
import { createBottomTabNavigator } from "react-navigation";
import AddPosting from "../screens/client/AddPosting";

const AddPosting = createBottomTabNavigator(
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
          <Icon name="stack-exchange" color={tintColor} size={24} />
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

const defaultGetStateForAction = AddPosting.router.getStateForAction;

export { AddPosting };
