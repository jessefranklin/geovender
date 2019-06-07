const intialState = {
  details: {}
};

export default (offer = (state = intialState, action) => {
  switch (action.type) {
    case "SET_DETAILS": {
      return action.payload;
    }
    default:
      return state;
  }
  return state;
});
