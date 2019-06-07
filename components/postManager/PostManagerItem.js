import React, { Component } from "react";
import styles from "../../styles";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import Swipeable from "react-native-swipeable";
import Rating from "../shared/rating";

export default class PostItem extends Component {
  state = {
    currentlyOpenSwipeable: null
  };
  render() {
    const { currentlyOpenSwipeable } = this.state;
    const { post } = this.props;

    return (
      <Swipeable>
        <View style={[styles.listItem]}>
          <View style={styles.swipeRow}>
            <View>
              <Text style={styles.leftSwipeItemText}>
                {post.meta.title} {post.status}
              </Text>
              <Text style={styles.leftSwipeItemSubText}>{post.created_at}</Text>
            </View>
            {post.status == "complete" && (
              <View style={styles.swipeIcon}>
                <TouchableOpacity
                  onPress={() => this.props.offerCompleteValidate(post)}
                >
                  <Text>Completed</Text>
                </TouchableOpacity>
              </View>
            )}
            <View>
              {post.status === "rateProvider" && (
                <View>
                  <Rating
                    rate={post.approvedOffer.provider}
                    post={post.id}
                    type={"provider"}
                  />
                </View>
              )}
            </View>
          </View>
        </View>
      </Swipeable>
    );
  }
}
