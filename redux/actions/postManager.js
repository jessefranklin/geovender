import { f } from "../../config/config";

export function fetchPostsOffers(postsArray) {
  return function(dispatch) {
    posts = [];

    if (!postsArray) return;
    const promises = Object.keys(postsArray).map((key, value) => {
      return f
        .database()
        .ref(`posts/`)
        .child(key)
        .once("value", function(snapshot) {
          if (snapshot.val() !== null) {
            posts.push(snapshot.val());
          }
        });
    });

    Promise.all(promises).then(function(results) {
      dispatch({ type: "ACTIVE_POSTS", payload: posts });
    });
  };
}
