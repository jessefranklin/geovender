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
import Icon from "react-native-vector-icons/FontAwesome";
import { deletePostById, editPostById } from "../../redux/actions/post";

export default class PostOfferItem extends Component {
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
            onPress={() => this.props.approveOffer(this.props)}
            style={[styles.rightSwipeItem, styles.lightGrey]}
          >
            <Icon name="check" color="green" size={24} />
          </TouchableOpacity>,
          <TouchableOpacity
            onPress={() => this.props.denyOffer(this.props)}
            style={[styles.rightSwipeItem, styles.lightGrey]}
          >
            <Icon name="times" color="grey" size={24} />
          </TouchableOpacity>
        ]}
        onRightButtonsOpenRelease={() => this.onOpen}
        onRightButtonsCloseRelease={() =>
          this.setState({ currentlyOpenSwipeable: null })
        }
      >
        <View style={[styles.listItem]}>
          <TouchableOpacity>
            <View style={styles.swipeRow}>
              <View style={styles.swipeIcon}>
                {this.props.state === 0 ? (
                  <Ionicons name="ios-at" size={30} color="grey" />
                ) : (
                  <Ionicons name="ios-checkmark" size={40} color="green" />
                )}
              </View>
              <View>
                <Text style={styles.leftSwipeItemText}>
                  {this.props.title}
                  {this.props.status && this.props.status}
                </Text>
                <Text style={styles.leftSwipeItemSubText}>
                  {this.props.uuid}
                  {this.props.applicant}
                  {this.props.title}
                  {this.props.date} {this.props.time}
                  Title: Date: Last: Client Name Updated: {this.props.date}
                  {this.props.createdAt}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </Swipeable>
    );
  }
}
