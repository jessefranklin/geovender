import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { TabStack } from './TabNavigator.js';
import Chat from '../screens/Chat';
import AddPosting from '../screens/AddPosting';

export const RootStackNavigator = createStackNavigator(
  {
    Main: {
      screen: TabStack,
    },
    Chat: {
      screen: Chat
    },
    AddPosting: {
      screen: AddPosting
    }
  },
  {
    initializeRouteName: 'Main',
    mode: 'modal'
  }
);