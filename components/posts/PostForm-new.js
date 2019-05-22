import React from "react";
import { connect } from "react-redux";
import uuid from "uuid/v1";
import numeral from "numeral";
import moment from "moment";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  PickerIOS,
  ScrollView
} from "react-native";
import styles from "../../styles";

import { FormSection, reduxForm } from "redux-form";
import { postDraft, publishPost } from "../../redux/actions/post";

import DatePicker from "react-native-datepicker";
import Geocoder from "react-native-geocoding";
import googleApi from "../../config/google";
import Geohash from "latlon-geohash";

import { PostPreview } from "./PostPreview";

import PostFormImages from "./PostFormImages";
import PostFieldSets from "./PostFieldSets";

Geocoder.init(googleApi.geoCode);

class PostForm extends React.Component {
  state = {
    id: uuid(),
    postState: 0,
    status: 0,
    meta: {
      title: "",
      subTitle: "",
      serviceName: "",
      serviceCategory: 0,
      description: ""
    },
    address: {
      street: "",
      city: "",
      zip: ""
    },
    coordinate: {
      latitude: "",
      longitude: ""
    },
    offer: {
      arrangement: true,
      hours: "",
      rate: "",
      total: "$0.00"
    },
    ownermeta: {
      id: this.props.user.id
    },
    dateTime: {
      fulfillmentType: "ASAP",
      date_flexable: false,
      startDate: moment().format("YYYY-MM-DD"),
      startTime: "",
      endDate: moment().format("YYYY-MM-DD"),
      endTime: ""
    },
    request: {
      active: ""
    },
    images: [],
    applicants: [],
    created_at: new Date().toLocaleString()
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.post !== this.props.post) {
      if (this.props.edit) {
        this.setState({ ...nextProps.post, postState: 0 });
      }
    }
    if (nextProps.post.images !== this.props.images) {
      this.setState({ images: nextProps.post.images });
    }
    if (nextProps.form !== this.props.form) {
      console.log(nextProps.form);
    }
  }

  toPreview = () => {
    this.geoCode();
    this.props.dispatch(postDraft(this.state));
    this.setState({ postState: 1 });
  };

  toEdit = () => {
    this.setState({ postState: 0 });
  };

  toPublish = () => {
    this.props.dispatch(publishPost(this.state));
    this.props.navigation.navigate("Profile");
  };

  geoCode = () => {
    let address =
      (this.state.address.street ? this.state.address.street + ", " : "") +
      (this.state.address.city ? this.state.address.city + ", " : "") +
      (this.state.address.zip ? this.state.address.zip : "");

    if (address == "") return;
    Geocoder.from(address)
      .then(json => {
        var location = json.results[0].geometry.location;
        if (location) {
          const coordinate = { ...this.state.coordinate };
          coordinate.latitude = location.lat;
          coordinate.longitude = location.lng;
          this.setState({ coordinate }, () => console.log(this.state));

          var geocode = Geohash.encode(location.lat, location.lng, 4);
          this.setState({ geocode });
        }
      })
      .catch(error => console.warn(error));
  };

  handleChange = obj => e => {
    console.log(e.target.name, e.target.value);
    if (obj) {
      let x = this.state[obj];
      x[e.target.name] = e.target.value;
      this.setState({ [obj]: x });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };

  render() {
    const total = numeral(this.state.offer.total).format("$0,0.00");
    const { id, images } = this.state;

    if (this.state.postState == 1) {
      return (
        <PostPreview
          statePreview={this.state}
          toEdit={this.toEdit}
          toPublish={this.toPublish}
        />
      );
    } else {
      return (
        <View>
          <ScrollView keyboardShouldPersistTaps={"handled"}>
            <View>
              <PostFormImages id={id} images={images} showDescription={false} />
            </View>

            <PostFieldSets name={"post"} />
          </ScrollView>
        </View>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    user: state.profile.user,
    post: state.post,
    form: state.form
  };
}

export default connect(mapStateToProps)(PostForm);
