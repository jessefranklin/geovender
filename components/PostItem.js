import React, {Component} from 'react';
import styles from '../styles';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Swipeable from 'react-native-swipeable';
import { Ionicons } from '@expo/vector-icons';

import { deletePostById, editPostById } from '../redux/actions/post';

export default class PostItem extends Component {

  state = {
    currentlyOpenSwipeable: null
  };

  handleScroll = () => {
    const {currentlyOpenSwipeable} = this.state;

    if (currentlyOpenSwipeable) {
      currentlyOpenSwipeable.recenter();
    }
  }

  onOpen = (event, gestureState, swipeable) => {
    if (currentlyOpenSwipeable && currentlyOpenSwipeable !== swipeable) {
      currentlyOpenSwipeable.recenter();
    }

    this.setState({currentlyOpenSwipeable: swipeable});
  }

  render() {
    const { currentlyOpenSwipeable } = this.state;

    return (
      <Swipeable
        leftContent={(
          <View style={[styles.leftSwipeItem]}>
            <Text>Pull action</Text>
          </View>
        )}
        rightButtons={[
          <TouchableOpacity onPress={()=> this.props.editPost(this.props.id)} style={[styles.rightSwipeItem, styles.lightGrey]}>
            <Ionicons name="ios-create" size={30} color="white" />
          </TouchableOpacity>,
          <TouchableOpacity onPress={()=> this.props.deletePost(this.props.id)}  style={[styles.rightSwipeItem, styles.red]}>
            <Ionicons name="ios-trash" size={30} color="white" />
          </TouchableOpacity>
        ]}
        onRightButtonsOpenRelease={() => this.onOpen}
        onRightButtonsCloseRelease={() => this.setState({currentlyOpenSwipeable: null})}
      >
        <View style={[styles.listItem]}>
          <TouchableOpacity onPress={()=> this.props.viewPost(this.props.id)}>
            <View style={styles.swipeRow}>
              {this.props.status == 0 ? (
                <View>
                  <Ionicons name="ios-attach" size={30} color="white" />
                </View>
              ):(
                <View>
                  <Ionicons name="ios-checkmark-outline" size={30} color="green" />  
                </View>
              )}
              <Text style={styles.leftSwipeItemText}>{this.props.title}</Text>
              <Text style={styles.leftSwipeItemSubText}>{this.props.createdAt}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Swipeable>
    );
  }
}

