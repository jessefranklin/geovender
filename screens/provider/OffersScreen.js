import React from "react";
import styles from "../../styles";
import { connect } from "react-redux";
import OfferList from "../../components/offers/OfferList";
import { fetchOffers } from "../../redux/actions/offer";
import { filterByStatus } from "../../selectors/filterByStatus";

import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView
} from "react-native";

class OffersScreen extends React.Component {
  state = {};

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {
    if (nextProps.offers !== this.props.offers) {
    }
  }

  render() {
    const { navigation, offers } = this.props;
    const pendingArray = offers.pending ? Object.values(offers.pending) : 0;
    const approvedArray = offers.approved ? Object.values(offers.approved) : 0;
    const deniedArray = offers.denied ? Object.values(offers.denied) : 0;

    return (
      <ScrollView>
        <View style={[styles.container]}>
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
        </View>
      </ScrollView>
    );
  }
}

mapStateToProps = state => {
  return {
    offers: filterByStatus(state.profile.user.offers)
  };
};

export default connect(mapStateToProps)(OffersScreen);
