import { f, cloudFuncURL } from "../../config/config";
import aws from "../../config/aws";
import { Permissions, Location, ImagePicker, Notifications } from "expo";
import { RNS3 } from "react-native-aws3";
import { Alert } from "react-native";
import { change } from "redux-form";
import { NavigationActions } from "react-navigation";
import axios from "axios";

export function postDraft(obj) {
  return function(dispatch) {
    axios
      .post(`${cloudFuncURL}/postDraft`, { obj })
      .then(response => {
        dispatch(postSuccess(response.data));
      })
      .catch(error => {});
  };
}

export function publishPost(obj) {
  return function(dispatch) {
    axios
      .post(`${cloudFuncURL}/postPublish`, { obj })
      .then(response => {
        // dispatch(approveOfferSuccess(response.data));
        dispatch(postSuccess(response.data));
        // dispatch({ type: "ADD_POST_TO_PROFILE", payload: response.data });
      })
      .catch(error => {});
  };
}

export function postInProgress(obj) {
  return function(dispatch) {
    axios
      .post(`${cloudFuncURL}/postInProgress`, { obj })
      .then(response => {
        // dispatch(approveOfferSuccess(response.data));
        dispatch(postSuccess(response.data));
        // dispatch({ type: "ADD_POST_TO_PROFILE", payload: response.data });
      })
      .catch(error => {});
  };
}

export function postClosed(obj) {
  return function(dispatch) {
    axios
      .post(`${cloudFuncURL}/postClosed`, { obj })
      .then(response => {
        // dispatch(approveOfferSuccess(response.data));
        dispatch(postSuccess(response.data));
        // dispatch({ type: "ADD_POST_TO_PROFILE", payload: response.data });
      })
      .catch(error => {});
  };
}

export function postSuccess(res) {
  return function(dispatch) {
    f.database()
      .ref("profilePosts/")
      .child(f.auth().currentUser.uid)
      .once("value", function(snapshot) {
        console.log(snapshot);
        dispatch({
          type: "ADD_POST_TO_PROFILE",
          payload: snapshot.val()
        });
      });
  };
}

export function editPostById(id, status) {
  return function(dispatch) {
    return new Promise((resolve, reject) => {
      f.database()
        .ref(`posts/${status}`)
        .child(id)
        .once("value", function(snapshot) {
          console.log(snapshot.val());
          dispatch({ type: "POST_JOB", payload: snapshot.val() });
          resolve();
        });
    });
  };
}

export function deletePostById(id, status) {
  return function(dispatch) {
    f.database()
      .ref(`posts/${status}`)
      .child(id)
      .remove();
    f.database()
      .ref(`profilePosts/${f.auth().currentUser.uid}`)
      .child(id)
      .remove();
    dispatch({ type: "REMOVE_POST", id });
  };
}

export function uploadImages(postId, status, image) {
  return function(dispatch) {
    ImagePicker.launchImageLibraryAsync({ allowsEditing: false }).then(function(
      result
    ) {
      var array = image;

      if (result.uri != undefined) {
        const file = {
          uri: result.uri,
          name: result.uri,
          type: "image/png"
        };

        const options = {
          keyPrefix: "uploads/" + postId + "/",
          bucket: "geovender",
          region: "us-east-1",
          accessKey: aws.accessKey,
          secretKey: aws.secretKey,
          successActionStatus: 201
        };

        console.log(postId, status);
        RNS3.put(file, options)
          .then(function(response) {
            console.log(response.status, status, postId);
            if (response.status === 201) {
              array.push(response.body.postResponse.location);
              if (status != undefined) {
                f.database()
                  .ref(`posts/${status}/${postId}/images`)
                  .set(array);
              }
              dispatch(change("post", "images", array));
            }
          })
          .catch(error => console.log(error));
      }
    });
  };
}
