import React from "react";

import styles from "../../styles";
import numeral from "numeral";
import Cards from "../posts/Cards";
import { Text, View, Image, TouchableOpacity, ScrollView } from "react-native";
import OfferComponent from "./OfferComponent";

const CliPostDetail = ({ marker }) => (
  <ScrollView>
    <View>
      <Cards images={marker.images || []} />
    </View>

    <Text style={styles.bold}>{marker.date}</Text>

    <Text>Total: {numeral(marker.offer.total).format("$0,0.00")}</Text>

    <Text style={styles.eyebrow}>
      {marker.serviceName} {marker.serviceCategory}
    </Text>

    <Text style={styles.bold}>{marker.title}</Text>
    <Text style={styles.bold}>{marker.subTitle}</Text>
    <Text style={styles.bold}>{marker.description}</Text>

    <Text style={styles.bold}>{marker.address.street}</Text>

    <OfferComponent marker={marker} />
  </ScrollView>
);

export default CliPostDetail;
