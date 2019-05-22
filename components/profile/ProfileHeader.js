import React from "react";
import styles from "../../styles";
import { connect } from "react-redux";
import { Permissions, ImagePicker } from "expo";
import { Ionicons } from "@expo/vector-icons";
import { Avatar } from "react-native-elements";
import {
  uploadImages,
  deleteImage,
  updateAbout
} from "../../redux/actions/profile";

import { Text, View, TextInput } from "react-native";

class ProfileHeader extends React.Component {
  state = {};

  componentWillMount() {
    this._checkPermissions();
  }

  componentWillReceiveProps(nextProps) {
    // if(nextProps.user.posts !== this.props.user.posts){
    // }
  }

  _checkPermissions = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ camera: status });

    const { statusRoll } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    this.setState({ cameraRoll: statusRoll });
  };

  addImage = () => {
    this.props.dispatch(uploadImages(this.props.user.images));
  };

  deleteImage() {
    this.self.props.dispatch(
      deleteImage(this.self.props.user.images, this.key)
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header} />
        {/* this.props.user.images.map((uri, key)=>{
                return (
                  <TouchableOpacity key={key} onPress={this.deleteImage.bind({self: this, key: key })} >
                    <Image style={styles.img} source={{uri: uri}} />
                  </TouchableOpacity>
                );
              }) */}
        <View style={styles.avatarContainer}>
          <Avatar
            size={130}
            rounded
            source={{ uri: this.props.user.photoUrl }}
            title=""
            onPress={() => this.addImage()}
            activeOpacity={0.7}
            showEditButton
          />
        </View>
        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <Text style={styles.name}>{this.props.user.name}</Text>
            <View style={styles.info}>
              <Text>3.5, {this.props.user.city}</Text>
            </View>
            <Text style={styles.description}>
              <TextInput
                multiline={true}
                numberOfLines={3}
                onChangeText={text => this.props.dispatch(updateAbout(text))}
                value={this.props.user.aboutMe}
              />
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

export default connect()(ProfileHeader);
