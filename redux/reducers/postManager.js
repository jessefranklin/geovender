const intialState = {
  draft: [],
  published: []
};

export default (posts = (state = intialState, action) => {
  switch (action.type) {
    case "ACTIVE_POSTS": {
      return action.payload;
    }
    default:
      return state;
  }
  return state;
});
