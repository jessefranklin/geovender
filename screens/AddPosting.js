import React from 'react';
import { connect } from 'react-redux';
import styles from '../styles'
import uuid from 'uuid/v1';
import { View } from 'react-native';
import PostFrom from '../components/PostForm';

class AddPosting extends React.Component {
  state = {
    id: uuid(),
    title: '',
    subTitle: '',
    serviceName: '',
    serviceCategory: '',
    description: '',
    status: 0,
    address: {
      street:'',
      city: '',
      zip: ''
    },
    coordinate:{
      latitude: '',
      longitude: '',
    },
    arrangement: 'Flat Rate',
    offer: {
      hours: '',
      rate: '',
      total: '$0.00'
    },
    ownermeta : {
      id: this.props.user.id
    },
    date: '',
    time: '',
    date_flexable: false,
    request: {
      active: '',
    },
    state: 0,
    images: [],
    applicants: [],
    provider: '',
    created_at: new Date().toLocaleString() 
  }

  render() {
      return (
        <View style={styles.container}>
          <PostFrom postObj={this.state} />
        </View>
      )
    }
}

function mapStateToProps(state) {
  return {
    user: state.profile.user
  };
}

export default connect(mapStateToProps)(AddPosting);