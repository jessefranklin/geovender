import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "../../styles/stylesForm";
import { Permissions, Location } from "expo";
import { Field, reduxForm, formValueSelector, change } from "redux-form";

import RenderInput from "../formEl/RenderInput";
import { Text, Button, View } from "react-native";
import Geocoder from "react-native-geocoding";
import Geohash from "latlon-geohash";

import googleApi from "../../config/google";

Geocoder.init(googleApi.geoCode);

export class PostFormLocation extends Component {
  state = {
    street: "",
    city: "",
    zip: "",
    coordinate: {}
  };

  async componentWillMount() {
    const self = this;
    Permissions.askAsync(Permissions.LOCATION).then(function(result) {
      if (result.status == "granted") {
        Location.getCurrentPositionAsync().then(function(location) {
          const locObj = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
          };
          Location.reverseGeocodeAsync(locObj).then(address => {
            self.props.dispatch(
              change("post", "address.city", address[0].city)
            );
          });
        });
      }
    });
  }

  async getCurrentAddress() {
    const self = this;
    Permissions.askAsync(Permissions.LOCATION).then(function(result) {
      if (result.status == "granted") {
        Location.getCurrentPositionAsync().then(function(location) {
          const locObj = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
          };
          Location.reverseGeocodeAsync(locObj).then(address => {
            self.props.dispatch(
              change("post", "address.street", address[0].name)
            );
            self.props.dispatch(
              change("post", "address.city", address[0].city)
            );
            self.props.dispatch(
              change("post", "address.zip", address[0].postalCode)
            );

            self.geoCode();
          });
        });
      }
    });
  }

  geoCode = () => {
    const self = this;
    const { street, city, zip } = this.props;
    let address =
      (street ? street + ", " : "") +
      (city ? city + ", " : "") +
      (zip ? zip : "");

    if (address == "") return;

    Geocoder.from(address)
      .then(json => {
        var location = json.results[0].geometry.location;
        if (location) {
          const coordinate = { ...this.state.coordinate };
          coordinate.latitude = location.lat;
          coordinate.longitude = location.lng;
          // this.setState({ coordinate }, () => console.log(this.state));

          var geocode = Geohash.encode(location.lat, location.lng, 4);
          // this.setState({ geocode });

          self.props.dispatch(change("post", "coordinate", coordinate));
          self.props.dispatch(change("post", "geocode", geocode));
        }
      })
      .catch(error => console.warn(error));
  };

  render() {
    return (
      <View style={[styles.container, styles.formContainer]}>
        <Text style={styles.h3}>Location</Text>
        <Field
          name="address.street"
          placeholder={"Street"}
          component={RenderInput}
          onBlur={() => this.geoCode()}
          type="text"
        />
        <Field
          name="address.city"
          placeholder={"City"}
          component={RenderInput}
          type="text"
        />
        <Field
          name="address.zip"
          placeholder={"Postal Code"}
          component={RenderInput}
          type="text"
        />
        <Button
          onPress={this.getCurrentAddress.bind(this)}
          style={[styles.button, { position: "absolute", bottom: 0 }]}
          icon={{
            name: "camera",
            size: 15,
            color: "white"
          }}
          title="Current Location"
        />
      </View>
    );
  }
}

PostFormLocation.defaultProps = {
  name: "address"
};

PostFormLocation = reduxForm({
  form: "post"
})(PostFormLocation);

const selector = formValueSelector("post");

PostFormLocation = connect(state => {
  return {
    street: selector(state, "address.street"),
    city: selector(state, "address.city"),
    zip: selector(state, "address.zip")
  };
})(PostFormLocation);

export default PostFormLocation;
