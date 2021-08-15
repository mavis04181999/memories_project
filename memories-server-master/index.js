import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import postRoutes from './routes/posts.js'
import userRoutes from './routes/users.js'

const app = express()

app.use(bodyParser.json({limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}))
app.use(cors());
dotenv.config()

app.use('/posts', postRoutes)
app.use('/users', userRoutes)

app.use('/', (req, res) => {
    res.send("Hello to Memories API")
})

// const CONNECTION_URL = 'mongodb+srv://mavis:mavis04181999@cluster0.iydcm.mongodb.net'
// /memories_db?retryWrites=true&w=majority
const PORT = process.env.PORT || 5000

mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`)))
    .catch((error) => console.log(error.message))

mongoose.set('useFindAndModify', false)