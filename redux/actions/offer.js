import { f, cloudFuncURL } from "../../config/config";
import { Permissions, Location, ImagePicker, Notifications } from "expo";
import axios from "axios";

export function postOffer(offer, post, user) {
  return function(dispatch) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${cloudFuncURL}/makeOffer`, { offer, post, user })
        .then(response => {
          dispatch(fetchProfileOffers());
          resolve();
        })
        .catch(error => {});
    });
  };
}

export function fetchProfileOffers() {
  return function(dispatch) {
    try {
      f.database()
        .ref(`profileOffers/${f.auth().currentUser.uid}`)
        .once("value", snap => {
          dispatch({ type: "PROFILE_OFFERS", payload: snap.val() });
        });
    } catch (e) {
      console.error(e);
    }
  };
}

export function fetchOffers(offersArray) {
  return function(dispatch) {
    offers = [];
    const promises = offersArray.map(offer => {
      return f
        .database()
        .ref(`offers/`)
        .child(offer.uuid)
        .once("value", function(snapshot) {
          if (snapshot.val() !== null) {
            offers.push(snapshot.val());
          }
        });
    });

    Promise.all(promises).then(function(results) {
      dispatch({ type: "GET_OFFERS", payload: offers });
    });
  };
}

export function denyOfferAction(offer) {
  return function(dispatch) {
    // Maybe move
    // f.database()
    //   .ref(`posts/${offer.postId}/offers/${offer.applicant}`)
    //   .remove();

    f.database()
      .ref(`offers/${offer.postId}/${offer.applicant}`)
      .remove();

    f.database()
      .ref(`profileOffers/${offer.applicant}/${offer.postId}`)
      .update({
        status: "denied"
      });

    dispatch({ type: "REMOVE_PROFILE_OFFER", payload: offer.applicant });
  };
}

export function approveOfferAction(offer) {
  return function(dispatch) {
    // Approve offer google cloud
    axios
      .post(`${cloudFuncURL}/approveOffer`, { offer })
      .then(response => {
        dispatch(approveOfferSuccess());
      })
      .catch(error => {});
  };
}

export function approveOfferSuccess(res) {
  return function(dispatch) {
    dispatch(fetchProfileOffers());
  };
}

export function deleteOfferById(id) {
  return function(dispatch) {
    f.database()
      .ref(`offers/${id}`)
      .child(f.auth().currentUser.uid)
      .remove();

    f.database()
      // .ref("profiles/" + f.auth().currentUser.uid + "/offers/")
      .ref(`profileOffers/${f.auth().currentUser.uid}`)
      .child(id)
      .remove();

    dispatch(approveOfferSuccess());
  };
}

export function providerOfferCompletedAction(offer) {
  return function(dispatch) {
    axios
      .post(`${cloudFuncURL}/providerOfferCompleted`, { offer })
      .then(response => {
        dispatch(approveOfferSuccess(response.data));
      })
      .catch(error => {});
  };
}

export function archiveOfferAction(offer) {
  return function(dispatch) {
    f.database()
      .ref(`posts/${offer.postId}`)
      .update({
        status: "completed"
      });

    // f.database()
    //   .ref(`offers/${offer.uuid}`)
    //   .update({
    //     status: 1
    //   });

    f.database();
    // .ref(`profiles/${offer.applicant}/offers/${offer.postId}`)
    ref(`profileOffers/${offer.applicant}/${offer.postId}`).update({
      status: "pendingComplete"
    });
  };
}
