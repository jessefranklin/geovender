import React from "react";
import { connect } from "react-redux";
import MapViews from "../../components/map/MapViews";

class MapView extends React.Component {
  componentWillMount() {}

  viewPost = id => {
    this.props.navigation.navigate("AddPosting");
  };

  render() {
    const { navigation } = this.props;

    return <MapViews navigation={navigation} />;
  }
}

mapStateToProps = state => {
  return {
    loggedIn: state.profile.loggedIn,
    user: state.profile.user,
    cards: state.profile.cards
  };
};

export default connect(mapStateToProps)(MapView);
