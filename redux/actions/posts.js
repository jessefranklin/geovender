import { f, cloudFuncURL } from "../../config/config";
import { Location } from "expo";
import Geohash from "latlon-geohash";
import axios from "axios";

// export const fetchPostsOld = region => async dispatch => {
//   try {
//     let geocode = Geohash.encode(region.latitude, region.longitude, 4);
//     f.database()
//       .ref("posts")
//       .orderByChild("geocode")
//       .equalTo(geocode)
//       .once("value", snap => {
//         // filter by 'published'
//         console.log(snap);
//         dispatch({ type: "GEO_POSTS", payload: snap.val() });
//       });
//   } catch (e) {
//     console.error(e);
//   }
// };

export function fetchPosts(region) {
  return function(dispatch) {
    let geocode = Geohash.encode(region.latitude, region.longitude, 4);

    axios
      .post(`${cloudFuncURL}/fetchPosts`, { geocode })
      .then(response => {
        dispatch({ type: "GEO_POSTS", payload: response.data });
      })
      .catch(error => {});
  };
}

export function fetchPostOffers(region) {
  return function(dispatch) {
    let geocode = Geohash.encode(region.latitude, region.longitude, 4);

    axios
      .post(`${cloudFuncURL}/fetchPosts`, { geocode })
      .then(response => {
        dispatch({ type: "GEO_POSTS", payload: response.data });
      })
      .catch(error => {});
  };
}
