import React from "react";
import styles from "../../styles";
import { connect } from "react-redux";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";

import ProfileHeader from "../../components/profile/ProfileHeader";
import PostList from "../../components/posts/PostList";
import { logout } from "../../redux/actions/profile";

class ProviderProfile extends React.Component {
  state = {};

  componentWillMount() {}

  componentWillReceiveProps(nextProps) {
    // if(nextProps.user.posts !== this.props.user.posts){
    // }
  }

  render() {
    const { navigation } = this.props;
    return (
      <ScrollView
        onScroll={this.handleScroll}
        scrollEventThrottle={1000}
        style={styles.container}
      >
        <View style={[styles.container]}>
          <ProfileHeader user={this.props.user} />
        </View>

        <TouchableOpacity onPress={() => this.props.dispatch(logout())}>
          <Text style={styles.button}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

mapStateToProps = state => {
  return {
    user: state.profile.user
  };
};

export default connect(mapStateToProps)(ProviderProfile);
