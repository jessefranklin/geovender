import React from 'react';
import Login from './screens/Login';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';

const store = configureStore();

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Login />
      </Provider>
    );
  }
}