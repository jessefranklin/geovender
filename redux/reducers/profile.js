import { omit } from "lodash";

export default (profile = (
  state = {
    loggedIn: false,
    cards: [],
    user: {
      id: "",
      photoUrl: "",
      name: "",
      aboutMe: " ",
      chats: " ",
      geocode: " ",
      images: "",
      notification: false,
      show: false,
      report: false,
      swipes: [],
      posts: [],
      token: " "
    }
  },
  action
) => {
  switch (action.type) {
    case "LOGIN": {
      return { ...state, user: action.user, loggedIn: action.loggedIn };
    }
    case "LOGOUT": {
      return { ...state, loggedIn: action.loggedIn };
    }

    case "GEOCODE": {
      return { ...state, user: { ...state.user, geocode: action.geocode } };
    }

    case "UPLOAD_IMAGES": {
      return { ...state, user: { ...state.user, images: action.payload } };
    }
    case "UPDATE_ABOUT": {
      return { ...state, user: { ...state.user, aboutMe: action.payload } };
    }
    case "GET_CARDS": {
      return { ...state, cards: action.payload };
    }
    case "GET_LOCATION":
      return { ...state, user: { ...state.user, geocode: action.payload } };
    case "NOTIFICATION_TOKEN":
      return { ...state, user: { ...state.user, token: action.payload } };
  }
  return state;
});
