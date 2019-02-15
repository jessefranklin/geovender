import React from 'react';
import styles from '../styles'
import { connect } from 'react-redux';
import { Permissions, ImagePicker } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import ProfileHeader from '../components/ProfileHeader';
import PostList from '../components/PostList';
import { uploadImages, deleteImage, updateAbout, fetchPosts, logout  } from '../redux/actions/profile';

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
  
  };

  componentWillMount() {
  }

  componentWillReceiveProps(nextProps){
    // if(nextProps.user.posts !== this.props.user.posts){
    // }
  }


  render() {
    const array = this.props.user.posts ? Object.values( this.props.user.posts ) : 0;
    return (
      <ScrollView onScroll={this.handleScroll} scrollEventThrottle={ 1000 } style={styles.container}>
        <View style={[styles.container]}>

          <ProfileHeader user={this.props.user} />
          
          <View>
            {array.length > 0 ?(
              <PostList posts={array} status={1} postsTitle={"Published"} />
            ):null}

            <TouchableOpacity onPress={() => this.props.navigation.navigate("AddPosting")}>
              <Text style={ styles.button }>Add Posting</Text>
            </TouchableOpacity>

            {/* array.length > 1 ?(
              <PostList posts={this.props.user.posts} status={0} postsTitle={"Draft"} />
            ):null */}

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