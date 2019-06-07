import React from "react";
import styles from "../../styles";
import { connect } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import LikesItem from "./LikesItem";
import { deletePostById, editPostById } from "../../redux/actions/post";

import { Text, View } from "react-native";

class OfferList extends React.Component {
  state = {
    currentlyOpenSwipeable: null
  };

  componentWillMount() {}

  componentWillReceiveProps(nextProps) {}

  handleScroll = () => {
    const { currentlyOpenSwipeable } = this.state;
  };

  deletePost = id => {
    this.props.dispatch(deletePostById(id));
  };

  editPost = id => {
    var self = this;
    this.props.dispatch(editPostById(id)).then(() => {
      self.props.navigation.navigate("AddPosting", {
        edit: true
      });
    });
  };

  viewPost = id => {
    this.props.dispatch(editPostById(id, true));
  };

  render() {
    return (
      <View style={[styles.container, styles.swipelist]}>
        <View style={styles.titleContainer}>
          <Text style={styles.title1}>{this.props.postsTitle}</Text>
        </View>
        {this.props.posts.map((post, key) => {
          return (
            <LikesItem
              key={post.id}
              {...post}
              viewPost={() => this.editPost(post.id, post.status)}
              editPost={() => this.editPost(post.id, post.status)}
              deletePost={() => this.deletePost(post.id, post.status)}
            />
          );
        })}
      </View>
    );
  }
}

export default connect()(OfferList);
