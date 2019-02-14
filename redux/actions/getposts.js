import { f } from '../../config/config';
import aws from '../../config/aws';
import { Permissions, Location, ImagePicker, Notifications } from 'expo';
import { RNS3 } from 'react-native-aws3';
import { Alert } from 'react-native';
import Geohash from 'latlon-geohash';


export function getPosts(geocode){
    return function(dispatch){
      f.database().ref('posts').orderByChild("geocode").equalTo(geocode).once('value', (snap) => {
        var items = [];
        snap.forEach((child) => {
          item = child.val();
          item.id = child.key;
          items.push(item); 
        });
        dispatch({ type: 'GET_POST', payload: items });
      });
    }
}