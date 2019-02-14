import { combineReducers } from 'redux';
import post from './post';
import posts from './posts';
import profile_posts from './profile_posts';
import profile from './profile';

export default combineReducers({
    profile, posts, post, profile_posts
});