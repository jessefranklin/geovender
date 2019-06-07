import React from "react";
import { f } from "../../config/config";
import styles from "../../styles";
import { connect } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import PostOfferItem from "./PostOfferItem";
import { denyOfferAction, approveOfferAction } from "../../redux/actions/offer";

import { Text, View } from "react-native";
class PostOfferList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    // f.database()
    //   .ref(`offers/`)
    //   .child(this.props.id)
    //   .once("value", function(snapshot) {
    //     // console.log(snapshot.val());
    //     this.setState({ offers: snapshot.val() });
    //   });
  }

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
    // const { offers } = this.state;
    const { offers } = this.props;

    return (
      <View style={[styles.container, styles.swipelist]}>
        {offers.map(offer => {
          return (
            <View key={offer.applicant}>
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
