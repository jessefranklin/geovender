const intialState = {
  settings: {}
};

export default (offer = (state = intialState, action) => {
  switch (action.type) {
    case "SET_SETTINGS": {
      return action.payload;
    }
    default:
      return state;
  }
  return state;
});
