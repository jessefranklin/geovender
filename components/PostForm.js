import React from 'react';
import { connect } from 'react-redux';
import styles from '../styles'
import { f } from '../config/config';
import uuid from 'uuid/v1';
import { postDraft, uploadImages, publishPost } from '../redux/actions/post';
import { SegmentedControls } from 'react-native-radio-buttons'
import DatePicker from 'react-native-datepicker'
import Geocoder from 'react-native-geocoding';
import { Ionicons } from '@expo/vector-icons';
import googleApi from '../config/google';
import numeral from 'numeral';
import Cards from '../components/Cards';

import { 
    Text, 
    View,
    Image,
    TouchableOpacity,
    TextInput,
    PickerIOS,
    ScrollView
  } from 'react-native';

const options = [
  "Flat Rate",
  "Hourly"
];

Geocoder.init(googleApi.geoCode);

class PostForm extends React.Component {
  state = {
    ...this.props.postObj
  }

  compontentDidUpdate() {
    if (this.props.post.images.length) {
      this.setState({ images: this.props.post.images })
    }
  }

  toPreview = () => {
    this.props.dispatch(postDraft(this.state))
    this.setState({ state: 1 })
  }

  toEdit = () => {
    this.setState({ state: 0 })
  }

  publish = () => {
    this.props.dispatch(publishPost(this.state))
    this.props.navigation.navigate("Profile")
  }

  processData = () => {
    this.geoCode();
  }

  geoCode = () => {
    const address = (this.state.address.street ? this.state.address.street + ', ': null)
                    + (this.state.address.city ? this.state.address.city + ', ' : null)
                    + this.state.address.zip ? this.state.address.zip : null ;
    if(address == '') return;
    Geocoder.from(address)
      .then(json => {
          var location = json.results[0].geometry.location;
          if(location){
            const coordinate = {...this.state.coordinate}
            coordinate.latitude = location.lat;
            coordinate.longitude = location.lng;
            this.setState({ coordinate })
          }
      })
      .catch(error => console.warn(error));
  }


  addImage = () => {
    this.props.dispatch(uploadImages(this.state.id, this.state.images))
  }

  textField = (name, placeholder, lines ) => {
    const mline = lines ? true : false;
    return (
      <TextInput
          style={styles.textInputForm}
          onChangeText={(text) => this.setState({ [name]: text })}
          multiline={mline}
          lines={lines}
          placeholder={placeholder}
          value={this.state[name]}/>
    )
  }

  nestedTextField = (name, placeholder, nest ) => {
    return (
      <TextInput
          style={styles.textInputForm}
          onChangeText={(text) => this.updateNested(name, text, nest)}
          placeholder={placeholder}
          value={this.state[nest][name]}/>
    )
  }

  nestedNumericField = (name, placeholder, nest ) => {
    return (
      <TextInput
          style={styles.textInputForm}
          onChangeText={(text) => this.updateNested(name, text, nest)}
          keyboardType='numeric'
          value={this.state[nest][name]}
          placeholder={placeholder}
          maxLength={10}
          />
    )
  }

  updateNested = (name, text, nest) => {
    const property = {...this.state[nest]}
    property[name] = text;
    this.setState({ [nest]:property }, () => {
      if(nest == 'offer'){
        this.getTotal(property);
      }
    })
  }

  getTotal = (property) => {
    let offerTotal;
    if(this.state.arrangement == 'Flat Rate'){
      offerTotal = this.state.offer.rate;
    } else {
      offerTotal = this.state.offer.rate*this.state.offer.hours;
    };
    property.total = offerTotal;
    this.setState({ offer: property })
  }

  flatOrHour = (val) => {
    const property = {...this.state.offer}
    this.setState({ 'arrangement': val}, () => {
      this.getTotal(property);
    }) 
  }
  
  render() {
    const total = numeral(this.state.offer.total).format('$0,0.00');
    if(this.state.state == 1){
      return (
        <ScrollView>
            <View>
              <TouchableOpacity style={[styles.img, styles.center]} onPress={this.addImage.bind(this)}>
                <Text>Add Title Image</Text>
              </TouchableOpacity>
              <Cards images={this.state.images}  />
            </View>  

            <Text style={styles.bold}>{this.state.date}</Text>
            <Text style={styles.bold}>{this.state.time}</Text>

            <Text>{this.state.arrangement} {this.state.offer.hours} {this.state.offer.rate} </Text>
            <Text>Total: {total}</Text>


            <Text style={styles.eyebrow}>{this.state.serviceName} {this.state.serviceCategory}</Text>
            <Text style={styles.bold}>{this.state.title}</Text>
            <Text style={styles.bold}>{this.state.subTitle}</Text>
            <Text style={styles.bold}>{this.state.description}</Text>


            <Text style={styles.bold}>{this.state.address.street}</Text>

            <TouchableOpacity onPress={() => this.toEdit()}>
              <Text style={ styles.button }>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.publish()}>
              <Text style={ styles.button }>Publish</Text>
            </TouchableOpacity>
          </ScrollView>
      )
    } else {
      return (
        <View style={styles.container}>
          <Text style={styles.bold}>Post</Text>
          <ScrollView>
            <View>
              <TouchableOpacity style={[styles.img, styles.center]} onPress={this.addImage.bind(this)}>
                <Text>Add Title Image</Text>
              </TouchableOpacity>
              <Cards images={this.state.images} />
            </View>  
  
            <Text style={styles.bold}>Payment</Text>
            <SegmentedControls
              tint={'#f80046'}
              selectedTint= {'white'}
              backTint= {'#1e2126'}
              options={ options }
              allowFontScaling={ false } 
              onSelection={(val) => this.flatOrHour(val) }
              selectedOption={ this.state.arrangement }
              optionStyle={{fontFamily: 'AvenirNext-Medium'}}
              optionContainerStyle={{flex: 1}}
            />
            
            <Text>{this.state.arrangement}</Text>
            {this.nestedNumericField('hours','Hours','offer')}
            {this.nestedNumericField('rate','Rate','offer')}
            <Text>Total: {total}</Text>
  
  
            <Text style={styles.bold}>Job description</Text>
            {this.textField('title','Title')}
            {this.textField('subTitle','Sub-title')}
            {this.textField('description','Description',4)}
            {this.textField('serviceName','Service Name')}
            {this.textField('serviceCategory','Category')}
  
            <Text style={styles.bold}>Job Location</Text>
            {this.nestedTextField('street','Address','address')}
            {this.nestedTextField('city','City','address')}
            {this.nestedTextField('zip','Zip','address')}
  
            <Text style={styles.bold}>Date and Time</Text>
            <DatePicker
              style={{width: 200}}
              date={this.state.date}
              mode="date"
              placeholder="select date"
              format="YYYY-MM-DD"
              minDate="2016-05-01"
              maxDate="2020-06-01"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0
                },
                dateInput: {
                  marginLeft: 36
                }
                // ... You can check the source to find the other keys.
              }}
              onDateChange={(date) => {this.setState({date: date})}}
            />
  
            <DatePicker
              style={{width: 200}}
              date={this.state.time}
              mode="time"
              placeholder="select time"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              is24Hour={false}
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0
                },
                dateInput: {
                  marginLeft: 36
                }
              }}
              onDateChange={(time) => {this.setState({time: time})}}
            />
  
            <TouchableOpacity onPress={() => this.toPreview()}>
              <Text style={ styles.button }>Preview</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      )

    };
  }
}

function mapStateToProps(state) {
  return {
    user: state.profile.user,
    post: state.post
  };
}

export default connect(mapStateToProps)(PostForm);