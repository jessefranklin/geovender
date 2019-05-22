import { combineReducers } from "redux";
import post from "./post";
import posts from "./posts";
import profile_posts from "./profile_posts";
import profile from "./profile";
import offers from "./offers";
import likes from "./likes";
import post_manager from "./postManager";
import { reducer as formReducer } from "redux-form";

export default combineReducers({
  profile,
  posts,
  post,
  offers,
  likes,
  post_manager,
  profile_posts,
  form: formReducer
});
