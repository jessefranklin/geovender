import React from 'react';
import styles from '../styles'
import { connect } from 'react-redux';
import { Permissions, ImagePicker } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import SwipeItem from '../components/SwipeItem';
import { uploadImages, deleteImage, updateAbout, fetchPosts, logout  } from '../redux/actions/profile';

import { deletePostById, editPostById } from '../redux/actions/post';

import { 
  Text, 
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView
} from 'react-native';

class Profile extends React.Component {
  state = {
    currentlyOpenSwipeable: null
  };

  componentWillMount() {
    this._checkPermissions();
    if(this.props.user.posts ){
      const array = Object.values( this.props.user.posts );
      this.props.dispatch(fetchPosts(array))
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.user.posts !== this.props.user.posts){
    }
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

  handleScroll = () => {
    const {currentlyOpenSwipeable} = this.state;
  };

  deletePost = (id) => {
    this.props.dispatch(deletePostById(id));
  }

  render() {
    return (
      <ScrollView onScroll={this.handleScroll} scrollEventThrottle={ 1000 } style={styles.container}>
        <View style={[styles.container]}>

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
                  <Text style={styles.bold}>About</Text>
                  <TextInput
                    multiline={true}
                    numberOfLines={5}
                    onChangeText={(text) => this.props.dispatch(updateAbout(text))}
                    value={this.props.user.aboutMe}/>
                </View>
              </View>
            </View>
          </View>
          
          <View>
              
            {this.props.posts.published.length?(
              <View onScroll={this.handleScroll} style={[styles.container, styles.swipelist]}>
                <View style={styles.titleContainer}>
                  <Text style={styles.title1}>Published</Text>
                </View>
                {this.props.posts.published.map((post, key)=>{
                  return (
                    <SwipeItem key={post.id} id={post.id} title={post.title}  />
                  )
                })}
              </View>
            ):null}

            <TouchableOpacity onPress={() => this.props.navigation.navigate("AddPosting")}>
              <Text style={ styles.button }>Add Posting</Text>
            </TouchableOpacity>

            {this.props.posts.draft.length?(
              <View onScroll={this.handleScroll} style={[styles.container, styles.swipelist]}>
                <View style={styles.titleContainer}>
                  <Text style={styles.title1}>Draft</Text>
                </View>
                {this.props.posts.draft.map((post, key)=>{
                  return (
                    <SwipeItem key={post.id} id={post.id} title={post.title} deletePost={() => this.deletePost(post.id)} />
                  )
                })}
              </View>
            ):null}

          </View>
        </View>

        <TouchableOpacity onPress={ () => this.props.dispatch(logout()) }>
          <Text style={ styles.button }>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    )
  }
}

mapStateToProps = (state) => {
  return {
    user: state.profile.user,
    posts: state.profile_posts
  };
}

export default connect(mapStateToProps)(Profile);