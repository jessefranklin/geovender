import React from "react";
import { connect } from "react-redux";
import { View } from "react-native";

import PostDetail from "../post/PostDetail";
import OfferComponent from "../bid/OfferComponent";

class ViewPosting extends React.Component {
  state = {};

  componentWillMount = async () => {};

  render() {
    const { post, user, navigation } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <View>
          <PostDetail state={post} />
        </View>

        <View style={{ marginTop: 340 }}>
          <OfferComponent marker={post} user={user} navigation={navigation} />
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.profile.user
  };
}

const styles = {
  container: {
    marginTop: 48,
    flex: 1
  },
  headerStyle: {
    fontSize: 36,
    textAlign: "center",
    fontWeight: "100",
    marginBottom: 24
  },
  elementsContainer: {
    backgroundColor: "#ecf5fd",
    marginLeft: 24,
    marginRight: 24,
    marginBottom: 24
  }
};

export default connect(mapStateToProps)(ViewPosting);
