import React from 'react';
import styles from '../styles'

import { connect } from 'react-redux';
import { login, getCards } from '../redux/actions';

import SwipeCards from 'react-native-swipe-cards';
import Cards from '../components/Cards.js'
import NoCards from '../components/NoCards.js'
import { f } from '../config/config';

import { 
  Text, 
  View,
  Image,
  Alert
} from 'react-native';

class Home extends React.Component {

  componentWillMount(){
    this.props.dispatch(getCards(this.props.user.geocode))
  }

  handleYup (card) {
    f.database().ref('cards/' + this.props.user.id + '/swipes').update({ [card.id]: true });
    this.checkMatch(card);
  }

  handleNope (card) {
    f.database().ref('cards/' + this.props.user.id + '/swipes').update({ [card.id]: false });
  }

  checkMatch(card){
    f.database().ref('cards/' + card.id + '/swipes/' + this.props.user.id).once('value', (snap) => {
      if(snap.val() == true){
        var me = {
          id: this.props.user.id,
          photoUrl: this.props.user.photoUrl,
          name: this.props.user.name
        }
        var user = {
          id: card.id,
          photoUrl: card.photoUrl,
          name: card.name
        }
        f.database().ref('cards/' + this.props.user.id + '/chats/' + card.id).set({user: user});
        f.database().ref('cards/' + card.id + '/chats/' + this.props.user.id).set({user: me});
      }
    });
  }

  render() {
    return (
      <SwipeCards
        cards={this.props.cards}
        stack={false}
        renderCard={(cardData) => <Cards {...cardData} />}
        renderNoMoreCards={() => <NoCards />}
        showYup={false}
        showNope={false}
        handleYup={this.handleYup.bind(this)}
        handleNope={this.handleNope.bind(this)}
        handleMaybe={this.handleMaybe}
        hasMaybeAction={false}/>
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