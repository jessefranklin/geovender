import React from "react";
import styles from "../../styles";
import { connect } from "react-redux";
import PostList from "../../components/posts/PostList";
import { filterByStatus } from "../../selectors/filterByStatus";
import { View, ScrollView } from "react-native";

class Profile extends React.Component {
  state = {};

  componentWillMount() {}

  componentWillReceiveProps(nextProps) {
    // if(nextProps.user.posts !== this.props.user.posts){
    // }
  }

  render() {
    const { posts } = this.props;
    const publishedArray = posts.published ? Object.values(posts.published) : 0;
    const draftsArray = posts.draft ? Object.values(posts.draft) : 0;
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
        </View>
      </ScrollView>
    );
  }
}

mapStateToProps = state => {
  return {
    user: state.profile.user,
    posts: filterByStatus(state.profile.user.posts)
  };
};

export default connect(mapStateToProps)(Profile);
