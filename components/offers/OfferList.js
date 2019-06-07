import React from "react";
import styles from "../../styles";
import { connect } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import OfferItem from "./OfferItem";
import {
  providerOfferCompletedAction,
  deleteOfferById,
  archiveOfferAction
} from "../../redux/actions/offer";

import { Text, View } from "react-native";

class OfferList extends React.Component {
  state = {
    currentlyOpenSwipeable: null
  };

  componentWillMount() {}

  componentWillReceiveProps(nextProps) {}

  handleScroll = () => {
    const { currentlyOpenSwipeable } = this.state;
  };

  deletePost = id => {
    this.props.deleteOfferById(id);
  };

  offerCompleted = offer => {
    this.props.providerOfferCompletedAction(offer);
  };

  archiveOffer = offer => {
    this.props.archiveOfferAction(offer);
  };

  render() {
    return (
      <View style={[styles.container]}>
        <View style={styles.titleContainer}>
          <Text style={styles.title1}>{this.props.postsTitle}</Text>
        </View>
        {this.props.offers.map((offer, index) => {
          return (
            <OfferItem
              key={index}
              offer={offer}
              deletePost={() => this.deletePost(offer.postId)}
              offerCompleted={() => this.offerCompleted(offer)}
              archiveOffer={() => this.archiveOffer(offer)}
            />
          );
        })}
      </View>
    );
  }
}

mapDispatchToProps = dispatch => ({
  providerOfferCompletedAction: offer =>
    dispatch(providerOfferCompletedAction(offer)),
  archiveOfferAction: offer => dispatch(archiveOfferAction(offer)),
  deleteOfferById: id => dispatch(deleteOfferById(id))
});

export default connect(
  undefined,
  mapDispatchToProps
)(OfferList);
