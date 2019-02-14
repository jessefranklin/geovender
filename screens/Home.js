import React from 'react';
import styles from '../styles'
import { connect } from 'react-redux';
import { f } from '../config/config';
import MapViews from '../components/MapViews';
import { 
  Text, 
  View,
  Image,
  Alert
} from 'react-native';


class Home extends React.Component {

  componentWillMount(){}

  render() {
    return (
      <MapViews />
    )
  }
}

mapStateToProps = (state) => {
  return {
    loggedIn: state.profile.loggedIn,
    user: state.profile.user,
    cards: state.profile.cards
  };
}

export default connect(mapStateToProps)(Home);