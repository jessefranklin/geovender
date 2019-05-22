import React from "react";
import styles from "../../styles";
import { connect } from "react-redux";

import ProfileHeader from "../../components/profile/ProfileHeader";
import ProfileOptions from "../../components/profile/ProfileOptions";
import { logout } from "../../redux/actions/profile";

import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView
} from "react-native";

class Profile extends React.Component {
  state = {};

  componentWillMount() {}

  componentWillReceiveProps(nextProps) {
    // if(nextProps.user.posts !== this.props.user.posts){
    // }
  }

  render() {
    const array = this.props.user.posts
      ? Object.values(this.props.user.posts)
      : 0;
    const { navigation } = this.props;
    return (
      <ScrollView
        onScroll={this.handleScroll}
        scrollEventThrottle={1000}
        style={styles.container}
      >
        <ProfileHeader user={this.props.user} />
        <ProfileOptions />
        <TouchableOpacity onPress={() => this.props.dispatch(logout())}>
          <Text style={styles.button}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

mapStateToProps = state => {
  return {
    user: state.profile.user,
    posts: state.profile_posts
  };
};

export default connect(mapStateToProps)(Profile);
