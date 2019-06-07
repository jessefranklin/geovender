import { combineReducers } from "redux";
import post from "./post";
import posts from "./posts";
import profilePosts from "./profilePosts";
import profileOffers from "./profileOffers";
import profile from "./profile";
import offers from "./offers";
import likes from "./likes";
import postManager from "./postManager";
import { reducer as formReducer } from "redux-form";
import profileDetails from "./profileDetails";
import profileSettings from "./profileSettings";
import profileAccount from "./profileAccount";

export default combineReducers({
  profile,
  posts,
  post,
  offers,
  likes,
  postManager,
  profilePosts,
  profileOffers,
  details: profileDetails,
  settings: profileSettings,
  account: profileAccount,
  form: formReducer
});
