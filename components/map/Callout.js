import React from "react";
import styles from "../../styles";
import { MapView, Permissions } from "expo";
import {
  Text,
  View,
  Image,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  TouchableHighlight
} from "react-native";
import numeral from "numeral";
import moment from "moment";

const MapCallout = ({ marker, viewPost }) => {
  return (
    <MapView.Callout
      tooltip
      style={styles.calloutView}
      onPress={() => viewPost({ marker })}
    >
      <View style={styles.calloutContent}>
        <View>
          <Text>{numeral(marker.offer.total).format()}</Text>
        </View>
        <Text>
          {marker.meta.serviceCategory} - {marker.meta.serviceName}
        </Text>
        <View>
          {marker.date_flexable && <Text>Flexiable</Text>}
          <Text>
            {moment(marker.dateTime.startDate).format("MMM DD")}{" "}
            {marker.dateTime.startTime}
          </Text>
        </View>
      </View>
    </MapView.Callout>
  );
};

export default MapCallout;
