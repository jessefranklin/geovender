import React from 'react';
import styles from '../styles';
import { connect } from 'react-redux';
import { Permissions, ImagePicker } from 'expo';
import { Ionicons } from '@expo/vector-icons';

import { uploadImages, deleteImage, updateAbout, fetchPosts, logout  } from '../redux/actions/profile';

import { 
  Text, 
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView
} from 'react-native';

class ProfileHeader extends React.Component {
  state = {
  
  };

  componentWillMount() {
    this._checkPermissions();
  }

  componentWillReceiveProps(nextProps){
    // if(nextProps.user.posts !== this.props.user.posts){
    // }
  }

  _checkPermissions = async() => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ camera: status });

    const { statusRoll } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    this.setState({ cameraRoll: statusRoll });

  }

  addImage = () => {
      this.props.dispatch(uploadImages(this.props.user.images))
  }

  deleteImage(){
    this.self.props.dispatch(deleteImage(this.self.props.user.images, this.key))
  }

  render() {
    return (
        <View style={styles.container}>
            <View style={styles.imgRow}>
              {/* this.props.user.images.map((uri, key)=>{
                return (
                  <TouchableOpacity key={key} onPress={this.deleteImage.bind({self: this, key: key })} >
                    <Image style={styles.img} source={{uri: uri}} />
                  </TouchableOpacity>
                );
              }) */}
              <TouchableOpacity style={[styles.img, styles.center]} onPress={this.addImage.bind(this)}>
                <Image style={styles.img} source={{uri: this.props.user.photoUrl}}/>  
                <Ionicons name="ios-add" size={75} style={styles.color} />
              </TouchableOpacity>
              <View>
                <Text style={[styles.center, styles.bold]}>{this.props.user.name}</Text>
                <View style={styles.container}>
                  <TextInput
                    multiline={true}
                    numberOfLines={3}
                    onChangeText={(text) => this.props.dispatch(updateAbout(text))}
                    value={this.props.user.aboutMe}/>
                </View>
              </View>
            </View>
        </View>
    )
  }
}

export default connect()(ProfileHeader);