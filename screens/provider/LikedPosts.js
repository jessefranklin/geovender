import React from "react";
import styles from "../../styles";
import { connect } from "react-redux";
import LikesList from "../../components/likes/LikesList";
import { fetchLikes } from "../../redux/actions/likes";

import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView
} from "react-native";

class LikedPosts extends React.Component {
  state = {};

  componentDidMount() {
    const array = this.props.userLikes
      ? Object.values(this.props.userLikes)
      : 0;
    this.props.dispatch(fetchLikes(this.props.userLikes));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userLikes !== this.props.userLikes) {
      this.props.dispatch(fetchLikes(nextProps.userLikes));
    }
  }

  render() {
    const array = this.props.likes ? Object.values(this.props.likes) : 0;
    const { navigation } = this.props;

    return (
      <ScrollView>
        <View style={[styles.container]}>
          <View>
            {array.length > 0 ? (
              <LikesList
                posts={array}
                status={1}
                postsTitle={"Published"}
                navigation={navigation}
              />
            ) : (
              <View>
                <Text>No likes</Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    );
  }
}

mapStateToProps = state => {
  return {
    userLikes: state.profile.user.swipes,
    likes: state.likes
  };
};

export default connect(mapStateToProps)(LikedPosts);
