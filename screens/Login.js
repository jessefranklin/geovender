import React from 'react';
import styles from '../styles'
import { connect } from 'react-redux';
import { f, facebookApi } from '../config/config';
import { createAppContainer } from 'react-navigation';
import { RootStackNavigator } from '../navigation/RootNavigator.js';
import { 
  Text, 
  View,
  Alert,
  Image,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';

import { login } from '../redux/actions/profile';

const AppContainer = createAppContainer(RootStackNavigator);

class Login extends React.Component {
  state = {}

  componentWillMount() {
    f.auth().onAuthStateChanged((user) => {
      if (user != null) {
        this.props.dispatch(login(user))
      }
    });
  }

  login = async () => {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
      facebookApi, { permissions: ['public_profile'] });
    if (type === 'success') {
       
        const credentials = f.auth.FacebookAuthProvider.credential(token);

        f.auth().signInAndRetrieveDataWithCredential(credentials).catch((error)=>{
            console.log(error);
        })
        
    }
  } 

  render() {
      if(this.props.loggedIn){
        return (
            <AppContainer />
        )
      } else {
        return (
          <View style={[styles.container, styles.center]}>
            <Image source={require('../assets/geovender-logo.png')}/>
            <TouchableOpacity onPress={() => this.login()}>
              <Text style={styles.button}>Facebook</Text>
            </TouchableOpacity>
           </View>
        )
      }
  }
}

mapStateToProps = (state) => {
  return {
    loggedIn: state.profile.loggedIn
  };
}
  
export default connect(mapStateToProps)(Login);