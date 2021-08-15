import * as api from '../api/index.js'
import {ActionCreators} from '../reducers/authReducers.js'

export const signIn = (formData, history) => async (dispatch) => {
    try {
        const {data} = await api.signIn(formData)
        dispatch(ActionCreators.auth(data))
        history.push('/')
    }catch (error) {
        console.log(error)
    }
}

export const signUp = (formData, history) => async (dispatch) => {
    try {
        const {data} = await api.signUp(formData)
        dispatch(ActionCreators.auth(data))
        history.push('/')
    }catch (error) {
        console.log(error)
    }
}
