import React from "react";
import numeral from "numeral";
import moment from "moment";
import Cards from "../cards/Cards";
import { Text, View, StyleSheet } from "react-native";

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8e8e8"
  },
  contentContainer: {
    flex: 1,
    margin: 20
  },
  eyebrow: {
    fontSize: 14,
    fontWeight: "200",
    color: "grey"
  },
  title: {
    fontSize: 24,
    fontWeight: "600"
  },
  subtitle: {},
  description: {
    marginTop: 20
  },
  dateTime: {
    backgroundColor: "#fff",
    overflow: "hidden",
    borderRadius: 10,
    margin: 20,
    padding: 20
  }
});

const PostDetail = ({ state }) => (
  <View style={styles.container}>
    {/* <Cards
      images={marker.images || []}
      showDescription={true}
      meta={marker.meta}
      offer={marker.offer}
      date={marker.dateTime}
    /> */}
    <Cards
      images={state.images || []}
      date={state.dateTime}
      offer={state.offer}
      showDescription={true}
    />
    <View style={[styles.contentContainer]}>
      <View>
        <Text style={styles.eyebrow}>
          {state.meta.serviceCategory} - {state.meta.serviceName}
        </Text>
        <Text style={styles.title}>{state.meta.title}</Text>
        <Text style={[styles.subtitle]}>{state.meta.subtitle}</Text>
        <Text style={[styles.description]}>{state.meta.description}</Text>
      </View>

      {/* <View style={styles.dateTime}>
        <Text>Requested: {state.dateTime.fulfillmentType}</Text>
        <Text>
          {state.dateTime.startDate} {state.dateTime.startTime}
        </Text>
      </View>

      <View>
        <Text>Offer: {state.offer.arrangement}</Text>
        <Text>
          {state.offer.rate} {state.offer.hours}
        </Text>
        <Text> {numeral(state.offer.total).format("$0,0.00")}</Text>
  </View> */}
    </View>
  </View>
);

export default PostDetail;
