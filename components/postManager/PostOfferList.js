import React from "react";
import styles from "../../styles";
import { connect } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import PostOfferItem from "./PostOfferItem";
import { denyOfferAction, approveOfferAction } from "../../redux/actions/offer";

import { Text, View } from "react-native";

class PostOfferList extends React.Component {
  state = {
    currentlyOpenSwipeable: null
  };

  componentWillMount() {}

  componentWillReceiveProps(nextProps) {}

  handleScroll = () => {
    const { currentlyOpenSwipeable } = this.state;
  };

  denyOffer = offer => {
    this.props.denyOfferAction(offer);
  };

  approveOffer = offer => {
    this.props.approveOfferAction(offer);
  };

  render() {
    return (
      <View style={[styles.container, styles.swipelist]}>
        {this.props.offers.map(offer => {
          return (
            <View key={offer.uuid}>
              <PostOfferItem
                {...offer}
                approveOffer={offer => this.approveOffer(offer)}
                denyOffer={offer => this.denyOffer(offer)}
              />
            </View>
          );
        })}
      </View>
    );
  }
}

mapDispatchToProps = dispatch => ({
  denyOfferAction: offer => dispatch(denyOfferAction(offer)),
  approveOfferAction: offer => dispatch(approveOfferAction(offer))
});

export default connect(
  undefined,
  mapDispatchToProps
)(PostOfferList);
