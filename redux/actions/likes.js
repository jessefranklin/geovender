import { f } from "../../config/config";

export function fetchLikes(likesArray) {
  return function(dispatch) {
    likes = [];

    if (!likesArray) return;
    const promises = Object.keys(likesArray).map((key, value) => {
      return f
        .database()
        .ref(`posts/published`)
        .child(key)
        .once("value", function(snapshot) {
          if (snapshot.val() !== null) {
            likes.push(snapshot.val());
          }
        });
      return likes;
    });

    Promise.all(promises).then(function(results) {
      dispatch({ type: "LIKE_POST", payload: likes });
    });
  };
}
