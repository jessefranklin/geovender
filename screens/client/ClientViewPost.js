import React from "react";
import { connect } from "react-redux";

import { Text, View, Image, TouchableOpacity, ScrollView } from "react-native";
import uuid from "uuid/v1";

import styles from "../../styles";
import Loading from "../../components/shared/loading";
import PostDetail from "../../components/post/PostDetail";

class ClientViewPost extends React.Component {
  state = {};

  componentWillMount = async () => {};

  render() {
    const { post } = this.props;

    return (
      <View style={styles.container}>
        <PostDetail state={post} />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    post: state.post
  };
}

export default connect(mapStateToProps)(ClientViewPost);
