import React from 'react';
import Home from '../screens/Home';
import styles from '../styles';
import Profile from '../screens/Profile';
import Matches from '../screens/Matches';
import { createMaterialTopTabNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import { 
  Image
} from 'react-native';

export const TabStack = createMaterialTopTabNavigator (
  {
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarLabel: ' ',
        tabBarIcon: ({focused}) => (
          <Ionicons style={ styles.nav } color={'#df4723'} name={focused ? 'ios-person' : 'ios-person'} size={40}/>
        ),
      },
    },
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: ' ',
        tabBarIcon: ({focused}) => (
          <Image style={ styles.logo } source={require('../assets/geovender-logo.png')}/>
        ),
      }
    },
    Matches: {
      screen: Matches,
      navigationOptions: {
        tabBarLabel: ' ',
        tabBarIcon: ({focused}) => (
          <Ionicons style={ styles.nav } color={'#df4723'} name={focused ? 'ios-chatbubbles' : 'ios-chatbubbles'} size={40}/>
        ),
      },
    },
  }, {
    navigationOptions: {
      header: null
    },
    initialRouteName: 'Home',
    swipeEnabled: false,
    tabBarOptions: {
      showIcon: true,
      labelStyle: {
        fontSize: 12,
        color: '#000'
      },
      style: {
        backgroundColor: '#fff',
        height: 75
      },
      
    }
  }
);