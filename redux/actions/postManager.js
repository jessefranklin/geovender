import { f, cloudFuncURL, auth } from "../../config/config";
import axios from "axios";

export function fetchPostsOffersNew(id) {
  return function(dispatch) {
    axios
      .post(`${cloudFuncURL}/fetchPostsWithOffers`, { id })
      .then(response => {
        console.log(response.data);
        // dispatch(fetchSuc(response.data));
        // dispatch({ type: "POSTS_WITH_OFFERS", payload: response });
      })
      .catch(error => {});
  };
}

export function fetchSuc(res) {
  return function(dispatch) {
    // console.log(res);
  };
}

export function fetchProfilePosts() {
  return function(dispatch) {
    f.database()
      .ref(`profilePosts/`)
      .child(auth.currentUser.uid)
      .once("value", snap => {
        // filter by 'published

        dispatch({ type: "PROFILE_POSTS", payload: snap.val() });
      });
  };
}

export const fetchPostsOffers = () => {
  return async function(dispatch) {
    const promises = await f
      .database()
      .ref(`profilePosts/`)
      .child(auth.currentUser.uid)
      .once("value");

    const posts = [];

    const postArr = await Promise.all(
      Object.keys(promises.toJSON()).map(async (key, index) => {
        const post = promises.val()[key];

        return f
          .database()
          .ref(`posts/`)
          .child(post.status)
          .child(key)
          .once("value", function(snapshot) {
            if (snapshot.val() !== null) {
              // console.log(snapshot.val());
              posts.push(snapshot.val());
            }
          });
      })
    ).then(results => {
      dispatch({ type: "POSTS_WITH_OFFERS", payload: posts });
    });
  };
};

export function offerCompletedValidatedAction(offer) {
  return function(dispatch) {
    //dispatch payment

    axios
      .post(`${cloudFuncURL}/clientOfferCompletedApproval`, { offer })
      .then(response => {
        dispatch(offerCompletedSuccess(response.data));
      })
      .catch(error => {});
    //provide rating for provider
  };
}

export function offerCompletedSuccess(res) {
  dispatch(fetchPostsOffers());
}
