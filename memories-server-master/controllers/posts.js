import Post from '../models/post.js'
import mongoose from "mongoose";

export const getPosts = async (req, res) => {
    try {
        const postMessage = await Post.find()

        res.status(200).json(postMessage)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const createPost = async (req, res) => {
    const post = req.body;
    // console.log("Request in createPost:", req)
    const newPost = new Post({...post, creator: req.userId, createdAt: new Date().toISOString()})

    try {
        await newPost.save()
        res.status(201).json(newPost)
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}

export const updatePost = async (req, res) => {
    const {id: _id} = req.params
    const post = req.body

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('No post with that ID')
    }

    const updatedPost = await Post.findByIdAndUpdate(_id, {...post, _id}, {new: true})
    res.json(updatedPost)

}

export const deletePost = async (req, res) => {
    const {id: _id} = req.params

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('No post with that ID')
    }

    await Post.findByIdAndRemove(_id)

    res.json({message: "the post successfully deleted"})
}

export const likePost = async (req, res) => {
    const {id} = req.params

    if(!req.userId)
        return res.json({message: "Unauthorized"})

    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send('Invalid ID')

    const post = await Post.findById(id)

    const index = post.likes.findIndex((id) => id === String(req.userId))

    if(index === -1)
        //    like the post
        post.likes.push(req.userId)
    else
        post.likes = post.likes.filter((id) => id !== String(req.userId))

    const updatedPost = await Post.findByIdAndUpdate(id, post, {new: true})

    res.json(updatedPost)
}