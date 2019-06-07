const intialState = {
  offer: {}
};

export default (offer = (state = intialState, action) => {
  switch (action.type) {
    case "POST_OFFER": {
      return action.payload;
    }
    case "GET_OFFERS": {
      return action.payload;
    }
    default:
      return state;
  }
  return state;
});
