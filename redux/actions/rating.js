import axios from "axios";
import { f, cloudFuncURL } from "../../config/config";

export function rateClient(payload) {
  console.log(payload);
  return function(dispatch) {
    axios
      .post(
        `${cloudFuncURL}/${
          payload.type == "provider" ? "rateProvider" : "rateClient"
        }`,
        { payload }
      )
      .then(response => {
        dispatch(ratingCompleted(response.data));
      })
      .catch(error => {});
  };
}

export function ratingCompleted(res) {
  console.log(res);
}
