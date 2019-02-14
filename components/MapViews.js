import React from 'react';
import styles from '../styles'
import { connect } from 'react-redux';
import { MapView, Permissions } from 'expo';
import { 
  Text, 
  View,
  Image,
  Alert,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import { Button } from 'react-native-elements';
import { fetchJobs } from '../redux/actions/jobs_actions';


class MapViews extends React.Component {
  state = {
    region: {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    markers: [
      {
        coordinate:{
          latitude: 37.78825,
          longitude: -122.4324,
        },
        title:"My Marker",
        description:"Some description"
      }
    ],
    maploader: false
  }

  async componentDidMount() {
    this.setState({
      maploader: true
    })
    await Permissions.askAsync(Permissions.LOCATION);
    this.props.dispatch(fetchJobs(this.state.region));
  }

  onButtonPress = () => {
    this.props.dispatch(fetchJobs(this.state.region));
  }

  onRegionChangeComplete = (region) => {
    this.setState({ region })
    this.props.dispatch(fetchJobs(region));
  }

  render() {
    if(!this.state.maploader){
      return (
        <View style={[styles.container, styles.center]}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
    )} else {
      return (
        <View style={{ flex: 1 }}>
          <MapView
            style={{ flex: 1 }}
            region={this.state.region}
            onRegionChangeComplete={this.onRegionChangeComplete}
          >
            {this.state.markers.map((marker, key) => {
              return (
                <MapView.Marker {...marker} key={key} >
                  <View style={styles.marker}>
                    <Text style={styles.markerText}>$300</Text>
                  </View>
                  <MapView.Callout>
                    <View >
                      <Text>$ipsuy</Text>
                    </View>
                  </MapView.Callout>
                </MapView.Marker>
              )
            })}
            
          </MapView>
        
          <View>
            <Button
              large
              title="Search This Area"
              backgroundColor="#009688"
              onPress={this.onButtonPress}
              style={[styles.mapButton]}
            />
           
          </View>
        </View>
      )
    }
  }
}

mapStateToProps = (state) => {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(MapViews);