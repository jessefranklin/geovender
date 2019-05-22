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
import { Ionicons } from "@expo/vector-icons";

import { deletePostById, editPostById } from "../../redux/actions/post";

export default class OfferItem extends Component {
  state = {
    currentlyOpenSwipeable: null
  };

  handleScroll = () => {
    const { currentlyOpenSwipeable } = this.state;

    if (currentlyOpenSwipeable) {
      currentlyOpenSwipeable.recenter();
    }
  };

  onOpen = (event, gestureState, swipeable) => {
    if (currentlyOpenSwipeable && currentlyOpenSwipeable !== swipeable) {
      currentlyOpenSwipeable.recenter();
    }

    this.setState({ currentlyOpenSwipeable: swipeable });
  };

  render() {
    const { currentlyOpenSwipeable } = this.state;

    return (
      <Swipeable
        leftContent={
          <View style={[styles.leftSwipeItem]}>
            <Text>Pull action</Text>
          </View>
        }
        rightButtons={[
          <TouchableOpacity
            onPress={() => this.props.editPost(this.props.id)}
            style={[styles.rightSwipeItem, styles.lightGrey]}
          >
            <Ionicons name="ios-create" size={30} color="white" />
          </TouchableOpacity>,
          <TouchableOpacity
            onPress={() => this.props.deletePost(this.props.id)}
            style={[styles.rightSwipeItem, styles.red]}
          >
            <Ionicons name="ios-trash" size={30} color="white" />
          </TouchableOpacity>
        ]}
        onRightButtonsOpenRelease={() => this.onOpen}
        onRightButtonsCloseRelease={() =>
          this.setState({ currentlyOpenSwipeable: null })
        }
      >
        <View style={[styles.listItem]}>
          <TouchableOpacity onPress={() => this.props.viewPost(this.props.id)}>
            <View style={styles.swipeRow}>
              <View style={styles.swipeIcon}>
                {this.props.state === 0 ? (
                  <Ionicons name="ios-at" size={30} color="grey" />
                ) : (
                  <Ionicons name="ios-checkmark" size={40} color="green" />
                )}
              </View>
              <View>
                <Text style={styles.leftSwipeItemText}>{this.props.title}</Text>
                <Text style={styles.leftSwipeItemSubText}>
                  Last Updated: {this.props.createdAt}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </Swipeable>
    );
  }
}
