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
import { Rating } from "react-native-elements";
import numeral from "numeral";
import moment from "moment";
import { deletePostById, editPostById } from "../../redux/actions/post";
import { ListItem } from "react-native-elements";
import { timeSince } from "../../utils/timeSince";
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
    const { rating } = this.props;

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
        <View style={[]}>
          <ListItem
            title={
              <View style={{ flex: 1, flexDirection: "row" }}>
                <Text>{this.props.name}</Text>
                <Text>* {this.props.rating}</Text>
                <Text style={styled.ratingText}>
                  {timeSince(moment(this.props.createdAt))} ago
                </Text>
              </View>
            }
            subtitle={
              <View style={styled.subtitleView}>
                <Text>
                  {this.props.status && this.props.status}
                  {numeral(this.props.offer).format("$0,0.00")}{" "}
                  {moment(this.props.date).format("MMM DD")} {this.props.time}
                </Text>
              </View>
            }
            leftAvatar={{ source: { uri: this.props.photoUrl } }}
          />

          {/* <View style={styles.swipeRow}>
            <View style={styles.swipeIcon}>
              {this.props.state === 0 ? (
                <Ionicons name="ios-at" size={30} color="grey" />
              ) : (
                <Ionicons name="ios-checkmark" size={40} color="green" />
              )}
            </View>
              </View> */}
        </View>
      </Swipeable>
    );
  }
}

styled = StyleSheet.create({
  subtitleView: {
    flexDirection: "row",
    paddingLeft: 10,
    paddingTop: 5
  },
  ratingImage: {
    height: 19.21,
    width: 100
  },
  ratingText: {
    paddingLeft: 10,
    color: "grey"
  }
});
