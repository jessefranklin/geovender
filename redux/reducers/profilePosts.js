import { omit } from "lodash";

const intialState = {};

export default (posts = (state = intialState, action) => {
  switch (action.type) {
    case "PROFILE_POSTS": {
      return action.payload;
    }
    case "ADD_POST_TO_PROFILE": {
      return action.payload;
    }
    case "REMOVE_POST": {
      return omit(state, action.id);
    }
    default:
      return state;
  }
});
