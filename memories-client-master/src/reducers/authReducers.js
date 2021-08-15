const initialState = {
    user: [],
}

export const ActionTypes = {
    'AUTH': 'AUTH',
    'LOGOUT': 'LOGOUT',
}

export const ActionCreators = {
    auth: payload => ({type: ActionTypes.AUTH, payload}),
    logout: payload => ({type: ActionTypes.LOGOUT, payload}),
}

export default function AuthReducers (state= initialState, action) {
    switch(action.type) {
        case ActionTypes.AUTH:
            localStorage.setItem("user", JSON.stringify({...action.payload}))
            return {...state, user: action.payload}
        case ActionTypes.LOGOUT:
            localStorage.clear()
            return {...state}
        default:
            return state;
    }
}