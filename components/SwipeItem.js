import React, {Component} from 'react';
import styles from '../styles'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Swipeable from 'react-native-swipeable';
import { Ionicons } from '@expo/vector-icons';

import { deletePostById, editPostById } from '../redux/actions/post';

export default class SwipeItem extends Component {

  state = {
    currentlyOpenSwipeable: null
  };

  handleScroll = () => {
    const {currentlyOpenSwipeable} = this.state;

    if (currentlyOpenSwipeable) {
      currentlyOpenSwipeable.recenter();
    }
  };
  
  deletePost = (id) => {
    this.props.deletePost(id);
    this.setState({currentlyOpenSwipeable: swipeable});
  }

  render() {
    const { currentlyOpenSwipeable } = this.state;
    const itemProps = {
      onOpen: (event, gestureState, swipeable) => {
        if (currentlyOpenSwipeable && currentlyOpenSwipeable !== swipeable) {
          currentlyOpenSwipeable.recenter();
        }

        this.setState({currentlyOpenSwipeable: swipeable});
      },
      onClose: () => this.setState({currentlyOpenSwipeable: null}),
      id: this.props.id,
      title: this.props.title,
      deletePost: this.deletePost
    };

    return (
        <PostItem {...itemProps}/>
    );
  }
}

function PostItem({onOpen, onClose, id, title, deletePost}) {
  editPost = (id) => { 
    console.log('edit '+id)
  }

  viewPost = (id) => {
    console.log('view '+id)
  }

  return (
    <Swipeable
      leftContent={(
        <View style={[styles.leftSwipeItem]}>
          <Text>Pull action</Text>
        </View>
      )}
      rightButtons={[
        <TouchableOpacity onPress={()=> this.editPost(id)} style={[styles.rightSwipeItem, styles.lightGrey]}>
          <Ionicons name="ios-create" size={30} color="white" />
        </TouchableOpacity>,
        <TouchableOpacity onPress={()=> deletePost(id)}  style={[styles.rightSwipeItem, styles.red]}>
          <Ionicons name="ios-trash" size={30} color="white" />
        </TouchableOpacity>
      ]}
      onRightButtonsOpenRelease={onOpen}
      onRightButtonsCloseRelease={onClose}
    >
      <View style={[styles.listItem]}>
        <TouchableOpacity onPress={()=> this.viewPost(id)}>
          <Text style={styles.leftSwipeItemText}>{title}</Text>
        </TouchableOpacity>
      </View>
    </Swipeable>
  );
}

function Example2({onOpen, onClose}) {
  return (
    <Swipeable
      leftButtonWidth={45}
      leftButtons={[
        <TouchableOpacity style={[styles.leftSwipeItem, {backgroundColor: 'papayawhip'}]}>
          <Text>1</Text>
        </TouchableOpacity>,
        <TouchableOpacity style={[styles.leftSwipeItem, {backgroundColor: 'olivedrab'}]}>
          <Text>2</Text>
        </TouchableOpacity>,
        <TouchableOpacity style={[styles.leftSwipeItem, {backgroundColor: 'mistyrose'}]}>
          <Text>3</Text>
        </TouchableOpacity>,
        <TouchableOpacity style={[styles.leftSwipeItem, {backgroundColor: 'mediumaquamarine'}]}>
          <Text>4</Text>
        </TouchableOpacity>,
        <TouchableOpacity style={[styles.leftSwipeItem, {backgroundColor: 'lightslategray'}]}>
          <Text>5</Text>
        </TouchableOpacity>,
        <TouchableOpacity style={[styles.leftSwipeItem, {backgroundColor: 'ivory'}]}>
          <Text>6</Text>
        </TouchableOpacity>
      ]}
      rightContent={(
        <View style={[styles.rightSwipeItem, {backgroundColor: 'linen'}]}>
          <Text>Pull action</Text>
        </View>
      )}
      onLeftButtonsOpenRelease={onOpen}
      onLeftButtonsCloseRelease={onClose}
    >
      <View style={[styles.listItem, {backgroundColor: 'paleturquoise'}]}>
        <Text>Example 2</Text>
      </View>
    </Swipeable>
  );
}

class Example3 extends Component {

  state = {
    leftActionActivated: false,
    toggle: false
  };

  render() {
    const {leftActionActivated, toggle} = this.state;

    return (
      <Swipeable
        leftActionActivationDistance={200}
        leftContent={(
          <View style={[styles.leftSwipeItem, {backgroundColor: leftActionActivated ? 'lightgoldenrodyellow' : 'steelblue'}]}>
            {leftActionActivated ?
              <Text>release!</Text> :
              <Text>keep pulling!</Text>}
          </View>
        )}
        onLeftActionActivate={() => this.setState({leftActionActivated: true})}
        onLeftActionDeactivate={() => this.setState({leftActionActivated: false})}
        onLeftActionComplete={() => this.setState({toggle: !toggle})}
      >
        <View style={[styles.listItem, {backgroundColor: toggle ? 'thistle' : 'darkseagreen'}]}>
          <Text>Example 3</Text>
        </View>
      </Swipeable>
    );
  }
}
