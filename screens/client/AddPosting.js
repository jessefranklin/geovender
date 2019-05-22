import React from "react";
import { connect } from "react-redux";
import uuid from "uuid/v1";
import { View } from "react-native";
import styles from "../../styles";
import PostFrom from "../../components/posts/PostForm";

class AddPosting extends React.Component {
  state = {};

  componentWillMount() {}

  render() {
    const edit = this.props.navigation.getParam("edit", false);
    return (
      <View style={styles.container}>
        <PostFrom
          postObj={this.state}
          edit={edit}
          navigation={this.props.navigation}
        />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.profile.user,
    post: state.post
  };
}

export default connect(mapStateToProps)(AddPosting);
