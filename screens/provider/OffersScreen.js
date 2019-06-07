import React from "react";
import { connect } from "react-redux";
import { StyleSheet } from "react-native";
import OfferList from "../../components/offers/OfferList";
import { fetchProfileOffers } from "../../redux/actions/offer";
import { filterByStatus } from "../../selectors/filterByStatus";

import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView
} from "react-native";

var styles = StyleSheet.create({
  containerTop: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: "#e8e8e8"
  }
});

class OffersScreen extends React.Component {
  state = {};

  componentDidMount() {
    this.props.fetchProfileOffers();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.offers !== this.props.offers) {
    }
  }

  render() {
    const { navigation, offers } = this.props;

    const pendingArray = offers.pending ? Object.values(offers.pending) : 0;
    const approvedArray = offers.approved ? Object.values(offers.approved) : 0;
    const inprogressArray = offers.inprogress
      ? Object.values(offers.inprogress)
      : 0;
    const completeArray = offers.complete ? Object.values(offers.complete) : 0;
    const closedArray = offers.closed ? Object.values(offers.closed) : 0;
    const rateClientArray = offers.rateClient
      ? Object.values(offers.rateClient)
      : 0;
    const deniedArray = offers.denied ? Object.values(offers.denied) : 0;

    return (
      <ScrollView style={[styles.containerTop]}>
        <View>
          {pendingArray.length > 0 && (
            <View>
              <OfferList
                offers={pendingArray}
                status={1}
                postsTitle={"Pending"}
                navigation={navigation}
              />
            </View>
          )}

          {approvedArray.length > 0 && (
            <View>
              <OfferList
                offers={approvedArray}
                status={1}
                postsTitle={"Approved"}
                navigation={navigation}
              />
            </View>
          )}

          {completeArray.length > 0 && (
            <View>
              <OfferList
                offers={completeArray}
                status={1}
                postsTitle={"Pending Client Approval"}
                navigation={navigation}
              />
            </View>
          )}

          {inprogressArray.length > 0 && (
            <View>
              <OfferList
                offers={inprogressArray}
                status={1}
                postsTitle={"Inprogress"}
                navigation={navigation}
              />
            </View>
          )}

          {rateClientArray.length > 0 && (
            <View>
              <OfferList
                offers={rateClientArray}
                status={1}
                postsTitle={"Completed - Rate"}
                navigation={navigation}
              />
            </View>
          )}

          {closedArray.length > 0 && (
            <View>
              <OfferList
                offers={closedArray}
                status={1}
                postsTitle={"Closed"}
                navigation={navigation}
              />
            </View>
          )}
        </View>
      </ScrollView>
    );
  }
}

mapStateToProps = state => {
  return {
    offers: filterByStatus(state.profileOffers)
  };
};

const mapDispatchToProps = dispatch => ({
  fetchProfileOffers: () => dispatch(fetchProfileOffers())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OffersScreen);
