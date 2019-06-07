import React from "react";
import { connect } from "react-redux";
import uuid from "uuid/v1";
import { View } from "react-native";
import styles from "../../styles";
import PostFrom from "../../components/postform";

class AddPosting extends React.Component {
  state = {};

  componentWillMount() {}

  render() {
    const edit = this.props.navigation.getParam("edit", false);
    const status = this.props.navigation.getParam("status");
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <PostFrom
          postObj={this.state}
          edit={edit}
          status={status}
          navigation={navigation}
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
