const intialState = {
  draft: [],
  published: []
};

export default (posts = (state = intialState, action) => {
  switch (action.type) {
    case "POSTS_WITH_OFFERS": {
      return action.payload;
    }
    default:
      return state;
  }
});
