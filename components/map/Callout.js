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

const MapCallout = ({ marker, viewPost }) => {
  return (
    <MapView.Callout
      tooltip
      style={styles.calloutView}
      onPress={() => viewPost({ marker })}
    >
      <View style={styles.calloutContent}>
        <Text>{marker.serviceCategory}</Text>
        <Text>{marker.title}</Text>
        <View>
          {marker.date_flexable && <Text>Flexiable</Text>}
          <Text>{marker.date}</Text>
        </View>
      </View>
    </MapView.Callout>
  );
};

export default MapCallout;
