import React from "react";
import { connect } from "react-redux";

import { Text, View, Image, TouchableOpacity, ScrollView } from "react-native";

import styles from "../../styles";

import PostDetail from "../../components/post/PostDetail";
import OfferComponent from "../../components/bid/OfferComponent";

class ViewPosting extends React.Component {
  state = {};

  componentWillMount = async () => {};

  render() {
    const { post, user, navigation } = this.props;

    return (
      <ScrollView style={styles.container}>
        <PostDetail state={post} />
        <OfferComponent marker={post} user={user} navigation={navigation} />
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.profile.user,
    post: state.post
  };
}

export default connect(mapStateToProps)(ViewPosting);
