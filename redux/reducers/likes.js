import _ from "lodash";

export default function(state = [], action) {
  switch (action.type) {
    case "LIKE_POST":
      return action.payload;
    case "LIKE_POSTs":
      return _.uniqBy([action.payload, ...state], "id");
    default:
      return state;
  }
}
