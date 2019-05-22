import React from "react";
import { createAppContainer } from "react-navigation";
import { connect } from "react-redux";

import styles from "../styles";
import { f, facebookApi } from "../config/config";
import { ClientRootStackNavigator } from "../navigation/ClientRootStackNavigator";
import { ProviderRootStackNavigator } from "../navigation/ProviderRootStackNavigator";
import { login } from "../redux/actions/profile";

import { Text, View, Alert, Image, TouchableOpacity } from "react-native";

const ClientAppContainer = createAppContainer(ClientRootStackNavigator);
const ProviderAppContainer = createAppContainer(ProviderRootStackNavigator);

class Login extends React.Component {
  state = {};

  componentWillMount() {
    f.auth().onAuthStateChanged(user => {
      if (user != null) {
        this.props.dispatch(login(user));
      }
    });
  }

  login = async () => {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
      facebookApi,
      { permissions: ["public_profile"] }
    );
    if (type === "success") {
      const credentials = f.auth.FacebookAuthProvider.credential(token);

      f.auth()
        .signInAndRetrieveDataWithCredential(credentials)
        .catch(error => {
          console.log(error);
        });
    }
  };

  render() {
    if (this.props.loggedIn) {
      if (this.props.user.type === "Client") {
        return <ProviderAppContainer />;
      } else {
        return <ClientAppContainer />;
      }
    } else {
      return (
        <View style={[styles.container, styles.center]}>
          <Image source={require("../assets/geovender-logo.png")} />
          <TouchableOpacity onPress={() => this.login()}>
            <Text style={styles.button}>Facebook</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}

mapStateToProps = state => {
  return {
    user: state.profile,
    loggedIn: state.profile.loggedIn
  };
};

export default connect(mapStateToProps)(Login);
