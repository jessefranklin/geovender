import React from "react";
import styles from "../../styles";
import { connect } from "react-redux";

import PostManagerList from "../../components/postManager/PostManagerList";
import { fetchPostsOffers } from "../../redux/actions/postManager";
import { Text, View, ScrollView } from "react-native";

class PostManagerScreen extends React.Component {
  state = {};

  componentWillMount() {
    this.props.fetchPostsOffers(this.props.user.posts);
  }

  componentWillReceiveProps(nextProps) {
    // if(nextProps.user.posts !== this.props.user.posts){
    // }
  }

  render() {
    const array = this.props.posts ? Object.values(this.props.posts) : 0;
    return (
      <ScrollView
        onScroll={this.handleScroll}
        scrollEventThrottle={1000}
        style={styles.container}
      >
        <View style={[styles.container]}>
          {array.length > 0 ? (
            <PostManagerList posts={array} status={1} postsTitle={"Offers"} />
          ) : (
            <View>
              <Text>No Offers</Text>
            </View>
          )}
          <View />
        </View>
      </ScrollView>
    );
  }
}

mapStateToProps = state => {
  return {
    user: state.profile.user,
    posts: state.post_manager
  };
};

const mapDispatchToProps = dispatch => ({
  fetchPostsOffers: postArray => dispatch(fetchPostsOffers(postArray))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostManagerScreen);
