import { f, cloudFuncURL } from "../../config/config";
import { Permissions, Location, ImagePicker, Notifications } from "expo";
import axios from "axios";

export function postOffer(offer, post, user) {
  return function(dispatch) {
    const postOffer = {
      postId: post.id,
      clientId: "",
      applicant: f.auth().currentUser.uid,
      category: post.serviceCategory,
      title: post.title,
      ...offer
    };
    const cOffers = {
      postId: post.id,
      clientId: "",
      applicant: f.auth().currentUser.uid,
      name: user.name,
      photoUrl: user.photoUrl,
      rating: user.rating || 5,
      ...offer
    };

    f.database()
      .ref("offers/")
      .update({ [offer.uuid]: postOffer });

    f.database()
      .ref(`posts/${post.id}/offers/${f.auth().currentUser.uid}`)
      .set(cOffers);

    f.database()
      .ref(`profiles/${f.auth().currentUser.uid}/offers/${post.id}`)
      .set(postOffer);

    // const me = {
    //   id: this.props.user.id,
    //   photoUrl: this.props.user.photoUrl,
    //   name: this.props.user.name
    // };

    // const user = {
    //   id: post.ownerMeta.id,
    //   photoUrl: post.ownerMeta.photoUrl,
    //   name: post.ownerMeta.name
    // };
    // f.database()
    //   .ref(`profiles/${f.auth().currentUser.uid}/chats/${post.id}/${card.id}`)
    //   .set({ user: user });

    // f.database()
    //   .ref(`profiles/${card.id}/chats/${post.id}/${this.props.user.id}`)
    //   .set({ user: me });

    // dispatch({ type: "POST_OFFER", payload: postOffer });
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
    f.database()
      .ref(`posts/${offer.postId}/offers/${offer.applicant}`)
      .remove();
    f.database()
      .ref(`offers/${offer.uuid}`)
      .remove();

    f.database()
      .ref(`profiles/${offer.applicant}/offers/${offer.postId}`)
      .update({
        status: "denied"
      });

    dispatch({ type: "REMOVE_POST", id });
  };
}

export function approveOfferAction(offer) {
  return function(dispatch) {
    // Approve offer google cloud
    axios
      .post(`${cloudFuncURL}/approveOffer`, { offer })
      .then(response => {
        dispatch(approveOfferSuccess(response.data));
      })
      .catch(error => {});
  };
}

export function approveOfferSuccess(res) {
  console.log(res);
}

export function deleteOfferById(id) {
  return function(dispatch) {
    f.database()
      .ref("offer/")
      .child(id)
      .remove();
    f.database()
      .ref("profiles/" + f.auth().currentUser.uid + "/offers/")
      .child(id)
      .remove();
    dispatch({ type: "REMOVE_POST", id });
  };
}

export function offerCompletedAction(offer) {
  return function(dispatch) {
    f.database()
      .ref(`posts/${offer.postId}`)
      .update({
        status: "completed"
      });

    f.database()
      .ref(`profiles/${offer.applicant}/offers/${offer.postId}`)
      .update({
        status: "pending-complete"
      });
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

    f.database()
      .ref(`profiles/${offer.applicant}/offers/${offer.postId}`)
      .update({
        status: "pending-complete"
      });
  };
}

export function offerCompletedValidatedAction(offer) {
  return function(dispatch) {
    //dispatch payment
    axios
      .post(`${cloudFuncURL}/offerCompleted`, { offer })
      .then(response => {
        dispatch(offerCompletedSuccess(response.data));
      })
      .catch(error => {});
    //provide rating for provider
  };
}

export function offerCompletedSuccess(res) {
  console.log(res);
}
