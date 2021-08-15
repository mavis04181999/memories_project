import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import UserModal from '../models/user.js'

export const signIn = async (req, res) => {
    const {email, password} = req.body
    try {
        const existingUser = await UserModal.findOne({email})

        if(!existingUser)
            return res.status(404).json({message: "User doesn't exist!."})

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)

        if(!isPasswordCorrect)
            return res.status(400).json({message: "Invalid Credentials!. "})

        const token = jwt.sign({email: existingUser.email, id: existingUser._id}, 'test', {expiresIn: "1h"})
        res.status(200).json({result: existingUser, token: token})
    } catch (error) {
        return res.status(500).json({message: error})
    }
}

export const signUp = async (req, res) => {
    const {firstname, lastname, email, password, password2} = req.body

    try {
        const existingUser = await UserModal.findOne({email})

        if(existingUser)
            return res.status(400).json({message: "User already exist!"})

        if(password !== password2)
            return res.status(400).json({message: "Password don't match"})
            console.log("Password don't match")

        const hashedPassword = await bcrypt.hash(password, 12)

        const result = await UserModal.create({email, password: hashedPassword, name: `${firstname} ${lastname}`})

        const token = jwt.sign({email: result.email, id: result._id}, 'test', {expiresIn: "1h"})

        res.status(200).json({result, token})
    } catch (error) {
        res.status(500).json({message: error})
    }
}