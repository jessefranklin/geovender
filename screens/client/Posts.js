import React, { Component } from "react";
import styles from "../../styles";
import { connect } from "react-redux";
import PostList from "../../components/posts/PostList";
import { filterByStatus } from "../../selectors/filterByStatus";
import { View, ScrollView } from "react-native";
import { fetchProfilePosts } from "../../redux/actions/postManager";

class Profile extends Component {
  state = {};

  componentWillMount() {
    this.props.fetchProfilePosts();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.posts !== this.props.posts) {
      // console.log(nextProps.user.posts);
    }
  }

  render() {
    const { posts } = this.props;
    const draftsArray = posts.draft ? Object.values(posts.draft) : 0;
    const publishedArray = posts.published ? Object.values(posts.published) : 0;
    const inprogressArray = posts.inprogress
      ? Object.values(posts.inprogress)
      : 0;
    const closedArray = posts.closed ? Object.values(posts.closed) : 0;
    const { navigation } = this.props;

    return (
      <ScrollView
        onScroll={this.handleScroll}
        scrollEventThrottle={1000}
        style={styles.container}
      >
        <View style={[styles.container]}>
          <View>
            {draftsArray.length > 0 ? (
              <PostList
                posts={draftsArray}
                status={0}
                postsTitle={"drafts"}
                navigation={navigation}
              />
            ) : null}
          </View>
          <View>
            {publishedArray.length > 0 ? (
              <PostList
                posts={publishedArray}
                status={1}
                postsTitle={"Published"}
                navigation={navigation}
              />
            ) : null}
          </View>
          <View>
            {inprogressArray.length > 0 ? (
              <PostList
                posts={inprogressArray}
                status={1}
                postsTitle={"In Progress"}
                navigation={navigation}
              />
            ) : null}
          </View>
          <View>
            {closedArray.length > 0 ? (
              <PostList
                posts={closedArray}
                status={1}
                postsTitle={"Closed"}
                navigation={navigation}
              />
            ) : null}
          </View>
        </View>
      </ScrollView>
    );
  }
}

mapStateToProps = state => {
  return {
    user: state.profile.user,
    posts: filterByStatus(state.profilePosts)
  };
};

const mapDispatchToProps = dispatch => ({
  fetchProfilePosts: () => dispatch(fetchProfilePosts())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
