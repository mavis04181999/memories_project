import {combineReducers} from "redux";

import PostReducers from './postReducers.js'
import AuthReducers from './authReducers.js'

export default combineReducers({
    posts: PostReducers,
    auth: AuthReducers,
})