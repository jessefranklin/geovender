import React from "react";
import styles from "../../styles";
import { connect } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import PostItem from "./PostItem";
import { deletePostById, editPostById } from "../../redux/actions/post";

import { Text, View } from "react-native";

class PostList extends React.Component {
  state = {
    currentlyOpenSwipeable: null
  };

  componentWillMount() {}

  componentWillReceiveProps(nextProps) {}

  handleScroll = () => {
    const { currentlyOpenSwipeable } = this.state;
  };

  deletePost = (id, status) => {
    this.props.dispatch(deletePostById(id, status));
  };

  editPost = (id, status) => {
    var self = this;
    this.props.dispatch(editPostById(id, status)).then(() => {
      self.props.navigation.navigate("AddPosting", {
        edit: true,
        status
      });
    });
  };

  viewPost = (id, status) => {
    var self = this;
    this.props.dispatch(editPostById(id, status)).then(() => {
      self.props.navigation.navigate("ClientViewPost");
    });
  };

  render() {
    const { posts } = this.props;
    return (
      <View style={[styles.container, styles.swipelist]}>
        <View style={styles.titleContainer}>
          <Text style={styles.title1}>{this.props.postsTitle}</Text>
        </View>
        {posts.map((post, key) => {
          return (
            <PostItem
              key={post.id}
              {...post}
              viewPost={() => this.viewPost(post.id, post.status)}
              editPost={() => this.editPost(post.id, post.status)}
              deletePost={() => this.deletePost(post.id, post.status)}
            />
          );
        })}
      </View>
    );
  }
}

export default connect()(PostList);
