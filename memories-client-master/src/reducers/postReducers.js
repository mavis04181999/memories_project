const initialState = {
    posts: [],
}

export const ActionTypes = {
    FETCH_POSTS: 'FETCH_POSTS',
    CREATE_POST: 'CREATE_POST',
    UPDATE_POST: 'UPDATE_POST',
    DELETE_POST: 'DELETE_POST',
    LIKE_POST: 'LIKE_POST',
}

export const ActionCreators = {
    fetchPosts: payload => ({type: ActionTypes.FETCH_POSTS, payload}),
    createPost: payload => ({type: ActionTypes.CREATE_POST, payload}),
    updatePost: payload => ({type: ActionTypes.UPDATE_POST, payload}),
    deletePost: payload => ({type: ActionTypes.DELETE_POST, payload}),
    likePost: payload => ({type: ActionTypes.LIKE_POST, payload}),
}

export default function PostReducers(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.DELETE_POST:
            for (let index = 0; index < state.posts.length; index++) {
                if (state.posts[index]._id === action.payload) {
                    state.posts.splice(index, 1)
                    break;
                }
            }

            return {...state, posts: [...state.posts]}
        case ActionTypes.FETCH_POSTS:
            return {...state, posts: [...action.payload]}
        case ActionTypes.CREATE_POST:
            return {...state, posts: [...state.posts, action.payload]}
        case ActionTypes.UPDATE_POST:
        case ActionTypes.LIKE_POST:
            for (let index = 0; index < state.posts.length; index++) {
                if (state.posts[index]._id === action.payload._id) {
                    state.posts[index] = action.payload
                    return {...state, posts: [...state.posts]}
                }
            }
            return {...state, posts: [...state.posts]}
        default:
            return state
    }
}

