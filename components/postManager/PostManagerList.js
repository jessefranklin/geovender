import React from "react";
import styles from "../../styles";
import { connect } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import PostManagerItem from "./PostManagerItem";
import PostOfferItem from "./PostOfferItem";
import PostOfferList from "./PostOfferList";

import { deletePostById, editPostById } from "../../redux/actions/post";
import { offerCompletedValidatedAction } from "../../redux/actions/postManager";
import { Text, View } from "react-native";

class PostManagerList extends React.Component {
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
        edit: true
      });
    });
  };

  viewPost = (id, status) => {
    this.props.dispatch(editPostById(id, status));
  };

  offerCompleteValidate = offer => {
    this.props.offerCompletedValidatedAction(offer);
  };

  render() {
    return (
      <View style={[styles.container, styles.swipelist]}>
        <View style={styles.titleContainer}>
          <Text style={styles.title1}>{this.props.postsTitle}</Text>
        </View>

        {this.props.posts.length > 0 ? (
          this.props.posts.map((post, index) => {
            const postOffers = post.offers ? Object.values(post.offers) : 0;

            if (postOffers.length > 0) {
              return (
                <View key={index}>
                  <PostManagerItem
                    key={post.id}
                    post={post}
                    viewPost={() => this.editPost(post.id, post.status)}
                    editPost={() => this.editPost(post.id, post.status)}
                    deletePost={() => this.deletePost(post.id, post.status)}
                    offerCompleteValidate={offer =>
                      this.offerCompleteValidate(offer)
                    }
                  />
                  <PostOfferList
                    key={`${index}-${post.id}`}
                    offers={postOffers}
                    status={post.status}
                  />
                </View>
              );
            }
          })
        ) : (
          <Text>No Offers</Text>
        )}
      </View>
    );
  }
}

mapDispatchToProps = dispatch => ({
  offerCompletedValidatedAction: offer =>
    dispatch(offerCompletedValidatedAction(offer))
});

export default connect(
  undefined,
  mapDispatchToProps
)(PostManagerList);
