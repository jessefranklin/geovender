import React from "react";
import styles from "../../styles";
import { connect } from "react-redux";
import { Text, ScrollView, TouchableOpacity } from "react-native";
import { publishPost } from "../../redux/actions/post";

class PostPreviewx extends React.Component {
  toEdit = () => {};

  publish = () => {
    this.props.dispatch(publishPost(this.state));
    this.props.navigation.navigate("Profile");
  };
  render() {
    return (
      <ScrollView>
        <Text>{post.title}</Text>
        <TouchableOpacity onPress={() => toEdit()}>
          <Text style={styles.button}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toPublish()}>
          <Text style={styles.button}>Publish</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
    post: state.post
  };
}

export default connect(mapStateToProps)(PostPreviewx);
