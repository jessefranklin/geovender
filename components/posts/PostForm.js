import React from "react";
import { connect } from "react-redux";
import styles from "../../styles";
import uuid from "uuid/v1";
import { postDraft, uploadImages, publishPost } from "../../redux/actions/post";
import { SegmentedControls } from "react-native-radio-buttons";
import DatePicker from "react-native-datepicker";
import Geocoder from "react-native-geocoding";
import googleApi from "../../config/google";
import numeral from "numeral";
import Cards from "../cards/Cards";
import PostDetail from "./PostDetail";
import Geohash from "latlon-geohash";
import SelectInput from "react-native-select-input-ios";
import moment from "moment";
import { CheckBox, Input, Button } from "react-native-elements";
import { SwitchComp } from "../partials/Switch";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  PickerIOS,
  ScrollView
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

Geocoder.init(googleApi.geoCode);

class PostForm extends React.Component {
  state = {
    id: uuid(),
    title: "",
    subTitle: "",
    serviceName: "",
    serviceCategory: 0,
    description: "",
    status: 0,
    address: {
      street: "",
      city: "",
      zip: ""
    },
    coordinate: {
      latitude: "",
      longitude: ""
    },
    fulfillmentType: "ASAP",
    arrangement: true,
    offer: {
      hours: "",
      rate: "",
      total: "$0.00"
    },
    ownermeta: {
      id: this.props.user.id
    },

    date_flexable: false,
    date: moment().format("YYYY-MM-DD"),
    time: "",

    request: {
      active: ""
    },
    state: 0,
    images: [],
    applicants: [],
    provider: "",
    created_at: new Date().toLocaleString()
  };

  constructor(props) {
    super(props);
  }

  compontentDidUpdate() {
    if (this.props.post.images.length) {
      this.setState({ images: this.props.post.images });
    }
  }

  componentWillReceiveProps(props) {
    if (props.post !== this.props.post) {
      if (this.props.edit) {
        this.setState({ ...props.post, state: 0 });
      }
    }
  }

  toPreview = () => {
    this.geoCode();
    this.props.dispatch(postDraft(this.state));
    this.setState({ state: 1 });
  };

  toEdit = () => {
    this.setState({ state: 0 });
  };

  publish = () => {
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

  addImage = () => {
    this.props.dispatch(uploadImages(this.state.id, this.state.images));
  };

  textField = (name, placeholder, lines) => {
    const mline = lines ? true : false;
    return (
      <Input
        onChangeText={text => this.setState({ [name]: text })}
        multiline={mline}
        lines={lines}
        placeholder={placeholder}
        value={this.state[name]}
      />
    );
  };

  nestedTextField = (name, placeholder, nest) => {
    return (
      <Input
        onChangeText={text => this.updateNested(name, text, nest)}
        placeholder={placeholder}
        value={this.state[nest][name]}
      />
    );
  };

  nestedNumericField = (name, placeholder, nest) => {
    return (
      <Input
        onChangeText={text => this.updateNested(name, text, nest)}
        keyboardType="numeric"
        value={this.state[nest][name]}
        placeholder={placeholder}
        maxLength={10}
      />
    );
  };

  updateNested = (name, text, nest) => {
    const property = { ...this.state[nest] };
    property[name] = text;
    this.setState({ [nest]: property }, () => {
      if (nest == "offer") {
        this.getTotal(property);
      }
    });
  };

  getTotal = property => {
    let offerTotal;
    if (this.state.arrangement == true) {
      offerTotal = this.state.offer.rate;
    } else {
      offerTotal = this.state.offer.rate * this.state.offer.hours;
    }
    property.total = offerTotal;
    this.setState({ offer: property });
  };

  flatOrHour = val => {
    const property = { ...this.state.offer };
    this.setState({ arrangement: val }, () => {
      this.getTotal(property);
    });
  };

  setCategory(val) {
    this.setState({ serviceCategory: val });
  }

  setFullfillmentType(val) {
    this.setState({ fulfillmentType: val });
  }

  render() {
    const total = numeral(this.state.offer.total).format("$0,0.00");
    const category = [
      { value: 0, label: "An extra hand" },
      { value: 1, label: "Moving" },
      { value: 2, label: "Lawn Care" },
      { value: 3, label: "Labour" },
      { value: 2, label: "Cleaning" }
    ];

    const fulfillmentType = [
      { value: "ASAP", label: "ASAP" },
      { value: "Firm Date Time", label: "Firm Date & Time" },
      { value: "Between", label: "Anytime Between" },
      { value: "Flexible", label: "Flexible" },
      { value: "Before", label: "Needed prior to Date and Time" }
    ];

    if (this.state.state == 1) {
      return (
        <ScrollView>
          <PostDetail state={this.state} />

          <TouchableOpacity onPress={() => this.toEdit()}>
            <Text style={styles.button}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.publish()}>
            <Text style={styles.button}>Publish</Text>
          </TouchableOpacity>
        </ScrollView>
      );
    } else {
      return (
        <View style={styles.formContainer}>
          <Text style={styles.bold}>Post</Text>
          <ScrollView>
            <View>
              <Button
                onPress={this.addImage}
                icon={{
                  name: "ios-images",
                  size: 15,
                  color: "white"
                }}
                title="From files"
              />

              <Button
                onPress={this.addImage.bind(this)}
                icon={{
                  name: "camera",
                  size: 15,
                  color: "white"
                }}
                title="Take a photo"
              />
              {this.state.images.length > 0 && (
                <Cards images={this.state.images} showDescription={false} />
              )}
            </View>

            <Text style={styles.bold}>Job description</Text>
            {this.textField("title", "Title")}
            {this.textField("subTitle", "Sub-title")}
            {this.textField("description", "Description")}
            <SelectInput
              value={this.state.serviceCategory}
              options={category}
              onCancelEditing={() => console.log("onCancel")}
              onSubmitEditing={this.setCategory.bind(this)}
              style={[styles.selectInput, styles.selectInputLarge]}
            />
            {this.textField("serviceName", "Service Name")}

            <Text style={styles.bold}>Job Location</Text>
            {this.nestedTextField("street", "Address", "address")}
            {this.nestedTextField("city", "City", "address")}
            {this.nestedTextField("zip", "Zip", "address")}

            <Text style={styles.bold}>Date and Time</Text>
            <View>
              <SelectInput
                value={this.state.fulfillmentType}
                options={fulfillmentType}
                onCancelEditing={() => console.log("onCancel")}
                onSubmitEditing={this.setFullfillmentType.bind(this)}
                style={[styles.selectInput, styles.selectInputLarge]}
              />
            </View>
            <CheckBox center title="Flexible" checked={this.state.checked} />
            <DatePicker
              style={{ width: 200 }}
              date={this.state.date}
              mode="date"
              placeholder="select date"
              format="YYYY-MM-DD"
              minDate={moment().format("YYYY-MM-DD")}
              maxDate={moment()
                .add(14, "days")
                .format("YYYY-MM-DD")}
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: "absolute",
                  left: 0,
                  top: 4,
                  marginLeft: 0
                },
                dateInput: {
                  marginLeft: 36
                }
              }}
              onDateChange={date => {
                this.setState({ date: date });
              }}
            />

            <DatePicker
              style={{ width: 200 }}
              date={this.state.time}
              mode="time"
              placeholder="select time"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              is24Hour={false}
              customStyles={{
                dateIcon: {
                  position: "absolute",
                  left: 0,
                  top: 4,
                  marginLeft: 0
                },
                dateInput: {
                  marginLeft: 36
                }
              }}
              onDateChange={time => {
                this.setState({ time: time });
              }}
            />
            <CheckBox
              center
              title="Click Here to add before date"
              iconRight
              iconType="material"
              checkedIcon="clear"
              uncheckedIcon="add"
              checkedColor="red"
              checked={this.state.checked}
            />

            <Text style={styles.bold}>Payment</Text>
            {/* <SegmentedControls
              tint={"#f80046"}
              selectedTint={"white"}
              backTint={"#1e2126"}
              options={options}
              allowFontScaling={false}
              onSelection={val => this.flatOrHour(val)}
              selectedOption={this.state.arrangement}
              optionStyle={{ fontFamily: "AvenirNext-Medium" }}
              optionContainerStyle={{ flex: 1 }}
            /> */}

            <SwitchComp
              fval={this.state.arrangement}
              sw={val => this.flatOrHour(val)}
            />
            <Text>{this.state.arrangement}</Text>
            {this.nestedNumericField("hours", "Hours", "offer")}
            {this.nestedNumericField("rate", "Rate", "offer")}
            <Text>Total: {total}</Text>

            <TouchableOpacity onPress={() => this.toPreview()}>
              <Text style={styles.button}>Preview</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    user: state.profile.user,
    post: state.post
  };
}

export default connect(mapStateToProps)(PostForm);
