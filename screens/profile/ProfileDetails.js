import React from "react";
import { connect } from "react-redux";
import uuid from "uuid/v1";
import { Text, View } from "react-native";
import styles from "../../styles";
import PostFrom from "../../components/postform";

class ProfileDetails extends React.Component {
  state = {};

  componentWillMount() {}

  render() {
    return (
      <View style={styles.container}>
        <Text>Details</Text>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.profile.user
  };
}

export default connect(mapStateToProps)(ProfileDetails);
