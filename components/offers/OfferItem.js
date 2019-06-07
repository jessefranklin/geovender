import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "../../styles";
import { Text, TouchableOpacity, View } from "react-native";
import Swipeable from "react-native-swipeable";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";
import numeral from "numeral";
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
    <View style={[styles.listItemOffer]}>
      <View style={styles.swipeRowOffer}>
        {/* <View>
          <Text style={styles.rowOffer}>$88</Text>
        </View> */}

        <View>
          <Text style={styles.leftSwipeItemSubText}>
            {offer.category} - {offer.service}
          </Text>
          <Text style={styles.listTitle}>{offer.title}</Text>

          <Text style={styles.statusBadge}>{offer.status && offer.status}</Text>
          <Text style={styles.leftSwipeItemSubText}>
            Offer: {numeral(offer.offer).format("$0,0.00")}
            {", "}
            {moment(offer.date).format("MMM DD")} {offer.time}
          </Text>
        </View>

        {offer.status === "approved" && (
          <View style={styles.swipeIcon}>
            <TouchableOpacity onPress={() => offerCompleted(offer)}>
              <Text>Completed</Text>
            </TouchableOpacity>
          </View>
        )}
        {offer.status === "rateClient" && (
          <View style={styles.swipeIcon}>
            <Rating post={offer.postId} type={"client"} />
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
