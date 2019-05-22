import React from "react";
import styles from "../../styles";
import { connect } from "react-redux";
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
import { Button } from "react-native-elements";
import MapCallout from "./Callout";
import { fetchPosts } from "../../redux/actions/posts";
import Geohash from "latlon-geohash";

class MapViews extends React.Component {
  state = {
    region: {
      latitude: 43.657818530884896,
      latitudeDelta: 0.021826887155924624,
      longitude: -79.42115585331366,
      longitudeDelta: 0.01609325408935547
    },
    markers: [],
    maploader: false
  };

  async componentDidMount() {
    this.setState({
      maploader: true
    });

    await Permissions.askAsync(Permissions.LOCATION).then(() => {
      const location = Geohash.decode(this.props.geocode);
      const region = { ...this.state.region };
      region.latitude = location.lat;
      region.longitude = location.lon;
      // this.setState({ region }, () => console.log(this.state));
    });

    this.props.dispatch(fetchPosts(this.state.region));
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.posts !== this.props.posts) {
      const markers = Object.values(nextProps.posts);
      this.setState({ markers });
    }
  };

  onButtonPress = () => {
    this.props.dispatch(fetchPosts(this.state.region));
  };

  onRegionChangeComplete = region => {
    this.setState({ region });
    this.props.dispatch(fetchPosts(region));
  };

  viewPost = ({ marker }) => {
    console.log(marker);
    this.props.navigation.navigate("ViewPost", { marker });
  };

  handleYup(card) {
    f.database()
      .ref("profiles/" + this.props.user.id + "/swipes")
      .update({ [card.id]: true });
  }

  handleNope(card) {
    f.database()
      .ref("profiles/" + this.props.user.id + "/swipes")
      .update({ [card.id]: false });
  }

  render() {
    const { navigation } = this.props;
    if (!this.state.maploader) {
      return (
        <View style={[styles.container, styles.center]}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1 }}>
          <MapView
            style={{ flex: 1 }}
            region={this.state.region}
            onRegionChangeComplete={this.onRegionChangeComplete}
          >
            {this.state.markers.map((marker, i) => {
              return (
                <MapView.Marker {...marker} key={i}>
                  <View style={styles.marker}>
                    <Text style={styles.markerText}>${marker.offer.total}</Text>
                  </View>
                  <MapCallout marker={marker} viewPost={this.viewPost} />
                </MapView.Marker>
              );
            })}
          </MapView>

          <View>
            <Button
              large
              title="Search This Area"
              backgroundColor="#009688"
              onPress={this.onButtonPress}
              style={[styles.mapButton]}
            />
          </View>
        </View>
      );
    }
  }
}

MapViews.propTypes = {
  provider: MapView.ProviderPropType
};

mapStateToProps = state => {
  return {
    user: state.user,
    geocode: state.profile.user.geocode,
    posts: state.posts
  };
};

export default connect(mapStateToProps)(MapViews);
