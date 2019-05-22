import { f } from "../../config/config";
import { Location } from "expo";
import Geohash from "latlon-geohash";

export const fetchPosts = region => async dispatch => {
  try {
    let geocode = Geohash.encode(region.latitude, region.longitude, 4);
    f.database()
      .ref("posts")
      .orderByChild("geocode")
      .equalTo(geocode)
      .once("value", snap => {
        dispatch({ type: "GEO_POSTS", payload: snap.val() });
      });
  } catch (e) {
    console.error(e);
  }
};
