import React from "react";
import styles from "../../styles";
import { connect } from "react-redux";
import OfferList from "../../components/offers/OfferList";
import Schedule from "../../components/calendar/";

import { Text, View, ScrollView } from "react-native";

class OffersScreen extends React.Component {
  state = {};

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {
    if (nextProps.offers !== this.props.offers) {
    }
  }

  render() {
    const { navigation, offers } = this.props;
    const array = offers ? Object.values(offers) : 0;

    return (
      <ScrollView>
        <View style={[styles.container]}>
          <View>
            <Schedule />
          </View>
        </View>
      </ScrollView>
    );
  }
}

mapStateToProps = state => {
  return {
    offers: state.profile.user.offers,
    likes: state.likes
  };
};

export default connect(mapStateToProps)(OffersScreen);
