import { omit } from "lodash";
const intialState = {};

export default (posts = (state = intialState, action) => {
  switch (action.type) {
    case "PROFILE_OFFERS": {
      return action.payload;
    }
    case "REMOVE_PROFILE_OFFER": {
      return omit(state, action.id);
    }
    default:
      return state;
  }
});
