import React from "react";
import Login from "./screens/Login";
import configureStore from "./store/configureStore";
import { Provider } from "react-redux";
import { Font } from "expo";

const store = configureStore();

export default class App extends React.Component {
  componentDidMount() {
    Font.loadAsync({
      RobotoBold: require("./assets/fonts/Roboto/Roboto-Bold.ttf"),
      Roboto: require("./assets/fonts/Roboto/Roboto-Medium.ttf")
    });
  }
  render() {
    return (
      <Provider store={store}>
        <Login />
      </Provider>
    );
  }
}
