import axios from 'axios'

// const url = 'https://memories-software-repo.herokuapp.com/posts'
// const url = 'http://localhost:5000/posts'

const API = axios.create({
    // baseURL: 'http://localhost:5000'
    baseURL: ' https://memories-software-repo.herokuapp.com'

})

API.interceptors.request.use((req) => {
    if(localStorage.getItem('user')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
    }
    return req
})

export const fetchPosts = () => API.get('/posts');

export const createPost = (postData) => API.post('/posts', postData)

export const updatePost = (id, postData) => API.patch(`posts/${id}`, postData)

export const deletePost = (id) => API.delete(`posts/${id}`)

export const likePost = (id) => API.patch(`posts/${id}/likePost`)

export const signIn = (formData) => API.post(`users/signIn`, formData)

export const signUp = (formData) => API.post(`users/signUp`, formData)