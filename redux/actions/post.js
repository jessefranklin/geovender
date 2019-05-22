import { f } from "../../config/config";
import aws from "../../config/aws";
import { Permissions, Location, ImagePicker, Notifications } from "expo";
import { RNS3 } from "react-native-aws3";
import { Alert } from "react-native";

export function postDraft(obj) {
  return function(dispatch) {
    f.database()
      .ref("posts/")
      .update({ [obj.id]: obj });
    dispatch({ type: "DRAFT", payload: obj });

    const post = {
      id: obj.id,
      title: obj.meta.title,
      applicants: " ",
      status: "draft"
    };

    f.database()
      .ref("profiles/" + f.auth().currentUser.uid + "/posts/" + obj.id)
      .set(post);

    f.database()
      .ref("profiles/")
      .child(f.auth().currentUser.uid)
      .once("value", function(snapshot) {
        dispatch({ type: "ADD_POST_TO_PROFILE", user: snapshot.val() });
      });
  };
}

export function publishPost(obj) {
  return function(dispatch) {
    f.database()
      .ref(`profiles/${f.auth().currentUser.uid}\${obj.id}`)
      .update({ status: "published" });

    f.database()
      .ref("posts/")
      .update({ [obj.id]: obj });

    dispatch({ type: "DRAFT", payload: {} });
  };
}

export function editPostById(id) {
  return function(dispatch) {
    return new Promise((resolve, reject) => {
      f.database()
        .ref("posts/")
        .child(id)
        .once("value", function(snapshot) {
          dispatch({ type: "POST_JOB", payload: snapshot.val() });
        });
      resolve();
    });
  };
}

export function deletePostById(id) {
  return function(dispatch) {
    f.database()
      .ref("posts/")
      .child(id)
      .remove();
    f.database()
      .ref("profiles/" + f.auth().currentUser.uid + "/posts/")
      .child(id)
      .remove();
    dispatch({ type: "REMOVE_POST", id });
  };
}

export function uploadImages(postId, image) {
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

        RNS3.put(file, options)
          .then(function(response) {
            if (response.status === 201) {
              array.push(response.body.postResponse.location);
              f.database()
                .ref("posts/" + postId + "/images")
                .set(array);
              dispatch({ type: "POST_IMAGES", payload: array });
            }
          })
          .catch(error => console.log(error));
      }
    });
  };
}
