import React from "react";
import { connect } from "react-redux";

import { Text, View, Image, TouchableOpacity, ScrollView } from "react-native";
import uuid from "uuid/v1";

import styles from "../../styles";
import Loading from "../shared/loading";
import CliPostDetail from "./CliPostDetail";

class ViewPost extends React.Component {
  state = {
    loading: true
  };

  componentWillMount = async () => {
    const marker = await this.props.navigation.getParam("marker");
    if (marker) {
      this.setState({ marker }, () => {
        this.setState({ loading: false });
      });
    }
  };

  render() {
    const { loading, marker } = this.state;
    if (loading) {
      return <Loading />;
    } else {
      return (
        <View style={styles.container}>
          <CliPostDetail marker={marker} />
        </View>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    user: state.profile.user,
    post: state.post
  };
}

export default connect(mapStateToProps)(ViewPost);
