import * as api from '../api/index.js'
import {ActionCreators} from '../reducers/postReducers.js'

export const getPosts = () => async (dispatch) => {
    try {
        const {data} = await api.fetchPosts()

        dispatch(ActionCreators.fetchPosts(data))
    } catch (error) {
        console.log(error.message)
    }
}

export const createPost = (post) => async (dispatch) => {
    try {
        const {data} = await api.createPost(post)

        dispatch(ActionCreators.createPost(data))
    } catch (error) {
        console.log(error)
    }
}

export const updatePost = (id, post) => async (dispatch) => {
    try{
        const {data} = await api.updatePost(id, post);

        dispatch(ActionCreators.updatePost(data))
    } catch (error) {
        console.log(error)
    }
}

export const deletePost = (id) => async (dispatch) => {
    try{
        await api.deletePost(id)

        dispatch(ActionCreators.deletePost(id))
    } catch (error) {
        console.log(error)
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        const {data} = await api.likePost(id)

        dispatch(ActionCreators.likePost(data))
    }
    catch (error) {
        console.log(error)
    }
}