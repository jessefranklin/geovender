const intialState = {
  account: {}
};

export default (offer = (state = intialState, action) => {
  switch (action.type) {
    case "SET_ACCOUNT": {
      return action.payload;
    }
    default:
      return state;
  }
  return state;
});
