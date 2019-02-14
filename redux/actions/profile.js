import { f } from '../../config/config';
import aws from '../../config/aws';
import { Permissions, Location, ImagePicker, Notifications } from 'expo';
import { RNS3 } from 'react-native-aws3';
import { Alert } from 'react-native';
import Geohash from 'latlon-geohash';

export function login(user){
    return function(dispatch){
      let params = {
        id: user.uid,
        photoUrl: user.photoURL,
        name: user.displayName,
        aboutMe: ' ',
        chats: ' ',
        geocode: ' ',
        images: [user.photoURL],
        notification: false,
        show: false,
        report: false,
        posts: [],
        swipes: {
          [user.uid]: false
        },
        token: ' ',
      }
      
      f.database().ref('profiles/').child(user.uid).once('value', function(snapshot){
        if(snapshot.val() !== null){
          dispatch({ type: 'LOGIN', user: snapshot.val(), loggedIn: true });
          dispatch(allowNotifications())
        } else {
          f.database().ref('profiles/' + user.uid ).update(params);
          // dispatch({ type: 'LOGIN', payload: params });
          dispatch({ type: 'LOGIN', user: params, loggedIn: true });
        }
        dispatch(getLocation());
      })
    }
}

export function fetchPosts(postsArray){
	return function(dispatch){
    draft = [];
    published = [];
    postsArray.map((post)=> {
      f.database().ref('posts/').child(post.id).once('value', function(snapshot){
        if(snapshot.val().state == 1){
          published.push(snapshot.val())
        } else {
          draft.push(snapshot.val())
        }
      });
    })
    
    dispatch({ type: 'PROFILE_POSTS', draft: draft, published: published  });
  }
}

export function logout(){
	return function(dispatch){
    f.auth().signOut()
    dispatch({ type: 'LOGOUT', loggedIn: false });
   }
}

export function deleteImage(images, key){
	return function(dispatch){
    Alert.alert(
      'Are you sure you want to Delete',
      '',
      [
        {text: 'Ok', onPress: () => {
          var array = images
          array.splice(key, 1)
    			dispatch({ type: 'UPLOAD_IMAGES', payload: array });
          f.database().ref('profiles/' + f.auth().currentUser.uid + '/images').set(array);
        }},
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed')},
      ],
      { cancelable: true }
    )
	}
}

export function updateAbout(value){
	return function(dispatch){
		dispatch({ type: 'UPDATE_ABOUT', payload: value });
    setTimeout(function(){  
			f.database().ref('profiles/' + f.auth().currentUser.uid).update({ aboutMe: value });
    }, 3000);
  }
}

export function getCards(geocode){
  return function(dispatch){
    f.database().ref('profiles').orderByChild("geocode").equalTo(geocode).once('value', (snap) => {
      var items = [];
      snap.forEach((child) => {
        item = child.val();
        item.id = child.key;
        items.push(item); 
      });
      dispatch({ type: 'GET_CARDS', payload: items });
    });
  }
}

export function uploadImages(image){
  return function(dispatch){

    ImagePicker.launchImageLibraryAsync({ allowsEditing: false }).then(function(result){

      var array = image;

      if(result.uri != undefined){
        const file = {
          uri: result.uri,
          name: result.uri,
          type: "image/png"
        }
        
        const options = {
          keyPrefix: "uploads/",
          bucket: "geovender",
          region: "us-east-1",
          accessKey: aws.accessKey,
          secretKey: aws.secretKey,
          successActionStatus: 201
        }
        
        RNS3.put(file, options).then(function(response){
          if (response.status === 201){
            array.push(response.body.postResponse.location)
            f.database().ref('profiles/' + f.auth().currentUser.uid + '/images').set(array);
            dispatch({ type: 'UPLOAD_IMAGES', payload: array });
          }
        }).catch((error)=> console.log(error))
      }
    
    })
  }
}

export function getLocation(){
	return function(dispatch){
		Permissions.askAsync(Permissions.LOCATION).then(function(result){
		  if(result){
		    Location.getCurrentPositionAsync({}).then(function(location){
		      var geocode = Geohash.encode(location.coords.latitude, location.coords.longitude, 4)
		      f.database().ref('profiles/' + f.auth().currentUser.uid).update({geocode: geocode});
		      dispatch({ type: 'GET_LOCATION', payload: geocode });
		    })
		  }
		})
	}
}

export function allowNotifications(){
  return function(dispatch){
    Permissions.getAsync(Permissions.NOTIFICATIONS).then(function(result){
      if (result.status === 'granted') {
        Notifications.getExpoPushTokenAsync().then(function(token){
          f.database().ref('profiles/' + f.auth().currentUser.uid ).update({ token: token });
          dispatch({ type: 'NOTIFICATION_TOKEN', payload: token });
        })
      }
    })
  }
}

export function sendNotification(id, name, text){
  return function(dispatch){
    f.database().ref('profiles/' + id).once('value', (snap) => {
      if(snap.val().token != null){

        return fetch('https://exp.host/--/api/v2/push/send', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            to: snap.val().token,
            title: name,
            body: text,
            badge: 1,
          }),
        });

      }
    });
  }
}