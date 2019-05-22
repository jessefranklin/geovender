import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "../../styles";
import { Text, TouchableOpacity, View } from "react-native";
import Swipeable from "react-native-swipeable";
import { Ionicons } from "@expo/vector-icons";
import Rating from "../shared/rating";

const OfferItem = ({ offer, deletePost, offerCompleted, archiveOffer }) => (
  <Swipeable
    rightButtons={[
      <TouchableOpacity
        onPress={() => deletePost(offer.id)}
        style={[styles.rightSwipeItem, styles.red]}
      >
        <Ionicons name="ios-trash" size={30} color="white" />
      </TouchableOpacity>
    ]}
  >
    <View style={[styles.listItem]}>
      <View style={styles.swipeRow}>
        <View>
          <Text style={styles.leftSwipeItemText}>
            {offer.title}
            {offer.status && offer.status}
          </Text>
          <Text style={styles.leftSwipeItemSubText}>
            {offer.category}
            {offer.title}
            {offer.date} {offer.time}
            {offer.date}
            {offer.createdAt}
          </Text>
        </View>
        {offer.status === "approved" && (
          <View style={styles.swipeIcon}>
            <TouchableOpacity onPress={() => offerCompleted(offer)}>
              <Text>Completed</Text>
            </TouchableOpacity>
          </View>
        )}
        {offer.status === "rate-client" && (
          <View style={styles.swipeIcon}>
            <TouchableOpacity onPress={() => offerCompleted(offer)}>
              <Text>reset</Text>
            </TouchableOpacity>
            <Rating user={offer.clientId} post={offer.postId} type={"client"} />
          </View>
        )}
      </View>
    </View>
  </Swipeable>
);

OfferItem.propTypes = {
  offer: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  offerCompleted: PropTypes.func.isRequired,
  archiveOffer: PropTypes.func.isRequired
};

export default OfferItem;
