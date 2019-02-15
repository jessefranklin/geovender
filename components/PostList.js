import React from 'react';
import styles from '../styles';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import PostItem from './PostItem';
import { deletePostById, editPostById } from '../redux/actions/post';

import { 
  Text, 
  View
} from 'react-native';

class PostList extends React.Component {
  state = {
    currentlyOpenSwipeable: null
  };

  componentWillMount() {
  }

  componentWillReceiveProps(nextProps){
  }

  handleScroll = () => {
    const {currentlyOpenSwipeable} = this.state;
  };

  deletePost = (id) => {
    this.props.dispatch(deletePostById(id));
  }

  editPost = (id) => {
    this.props.dispatch(editPostById(id));
  }

  viewPost = (id) => {
    this.props.dispatch(editPostById(id, true));
  }

  render() {
    return (
        <View style={[ styles.container, styles.swipelist ]}>
            <View style={styles.titleContainer}>
                <Text style={styles.title1}>{this.props.postsTitle}</Text>
            </View>
            {this.props.posts.map((post, key)=>{
                return (
                    <PostItem key={post.id} {...post} 
                        viewPost={() => this.editPost(post.id)}
                        editPost={() => this.editPost(post.id)}
                        deletePost={() => this.deletePost(post.id)} />
                )
            })}
        </View>
    )
  }
}


export default connect()(PostList);