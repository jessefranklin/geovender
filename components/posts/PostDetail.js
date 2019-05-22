import React from "react";
import styles from "../../styles";
import numeral from "numeral";
import Cards from "../cards/Cards";
import { Text, View } from "react-native";

const PostDetail = ({ state }) => (
  <View>
    <View>
      <Cards images={state.images || []} showDescription={true} />
      <Text>{state.images}</Text>
    </View>

    {/* <Text style={styles.bold}>{state.date}</Text>
    <Text style={styles.bold}>{state.time}</Text>

    <Text>
      {state.arrangement} {state.offer.hours} {state.offer.rate}{" "}
    </Text>
    <Text>Total: {numeral(state.offer.total).format("$0,0.00")}</Text>

    <Text style={styles.eyebrow}>
      {state.serviceName} {state.serviceCategory}
    </Text>
    <Text style={styles.bold}>{state.title}</Text>
    <Text style={styles.bold}>{state.subTitle}</Text>
    <Text style={styles.bold}>{state.description}</Text>

<Text style={styles.bold}>{state.address.street}</Text> */}
  </View>
);

export default PostDetail;
