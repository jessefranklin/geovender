import React from "react";
import styles from "../../styles";
import { connect } from "react-redux";
import { Permissions } from "expo";
import Geohash from "latlon-geohash";
import { f } from "../../config/config";
import { fetchPosts } from "../../redux/actions/posts";
import { Text, View, Image, ActivityIndicator, Alert } from "react-native";
import SwipeCards from "react-native-swipe-cards";
import Cards from "../../components/cards/Cards.js";
import NoCards from "../../components/posts/NoCards.js";

class Deck extends React.Component {
  state = {
    region: {
      latitude: 43.657818530884896,
      latitudeDelta: 0.021826887155924624,
      longitude: -79.42115585331366,
      longitudeDelta: 0.01609325408935547
    },
    markers: [],
    cardloader: false,
    posts: []
  };
  async componentDidMount() {
    this.setState({
      cardloader: true
    });

    await Permissions.askAsync(Permissions.LOCATION).then(() => {
      const location = Geohash.decode(this.props.geocode);
      const region = { ...this.state.region };
      region.latitude = location.lat;
      region.longitude = location.lon;
      // this.setState({ region }, () => console.log(this.state));
    });

    this.props.dispatch(fetchPosts(this.state.region));
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.posts !== this.props.posts) {
      const posts = Object.values(nextProps.posts);
      this.setState({ posts });
    }
  };

  handleYup(card) {
    f.database()
      .ref("profiles/" + this.props.user.id + "/swipes")
      .update({ [card.id]: true });
  }

  handleNope(card) {
    f.database()
      .ref("profiles/" + this.props.user.id + "/swipes")
      .update({ [card.id]: false });
  }

  checkMatch(card) {
    f.database()
      .ref("profiles/" + this.props.user.id + "/swipes/" + card.id)
      .once("value", snap => {
        if (snap.val() == true) {
          var me = {
            id: this.props.user.id,
            photoUrl: this.props.user.photoUrl,
            name: this.props.user.name
          };
          var user = {
            id: card.id,
            photoUrl: card.photoUrl,
            name: card.name
          };
          f.database()
            .ref("cards/" + this.props.user.id + "/chats/" + card.id)
            .set({ user: user });
          f.database()
            .ref("cards/" + card.id + "/chats/" + this.props.user.id)
            .set({ user: me });
        }
      });
  }

  render() {
    const { navigation, posts } = this.props;
    if (!this.state.cardloader) {
      return (
        <View style={[styles.container, styles.center]}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    } else {
      return (
        <View>
          <SwipeCards
            cards={this.state.posts}
            stack={false}
            renderCard={cardData => <Cards {...cardData} />}
            renderNoMoreCards={() => <NoCards />}
            showYup={false}
            showNope={false}
            handleYup={this.handleYup.bind(this)}
            handleNope={this.handleNope.bind(this)}
            hasMaybeAction={false}
          />
        </View>
      );
    }
  }
}

mapStateToProps = state => {
  return {
    user: state.profile.user,
    geocode: state.profile.user.geocode,
    posts: state.posts
  };
};

export default connect(mapStateToProps)(Deck);
