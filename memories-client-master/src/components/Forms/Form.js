import React, {useState, useEffect} from 'react'
import {TextField, Button, Typography, Paper} from "@material-ui/core";
import FileBase from "react-file-base64";
import {useDispatch, useSelector} from "react-redux";

import useStyles from './styles.js'

import {createPost, updatePost} from "../../actions/posts";


const Form = ({currentId, setCurrentId}) => {
    const dispatch = useDispatch()
    const classes = useStyles()
    const user = JSON.parse(localStorage.getItem('user'))
    const [postData, setPostData] = useState({
        title: '',
        message: '',
        tags: '',
        selectedFile: ""
    })

    const post = useSelector((state )=> currentId ? state.posts.posts.find(p => p._id === currentId) : null)

    useEffect(() => {
        if(post) {
            setPostData(post)
        }
    }, [post])

    const handleSubmit = (event) => {
        event.preventDefault()

        if (currentId) {
            dispatch(updatePost(currentId, {...postData, name: user?.result.name}))

        } else {
            dispatch(createPost({...postData, name: user?.result.name}))
        }
        clear()
    }

    const clear = () => {
        let sFile = document.getElementsByClassName("sFile")[0].firstChild
        sFile.value = null

        setCurrentId(null)
        setPostData({
            title: '',
            message: '',
            tags: '',
            selectedFile: '',
        })
    }

    if(!user?.result.name) {
        return(
            <Paper className={classes.paper}>
                <Typography variant={"h6"} align={"center"}>
                    Please Sign in to create your own memories and like other's memories.
                </Typography>
            </Paper>
        )
    }

    return (
        <>
            <Paper className={classes.paper}>
                <form autoComplete={"off"} noValidate className={`${classes.root} ${classes.form}`}
                      onSubmit={handleSubmit}>
                    <Typography variant={"h6"}>{currentId ? 'Editing' : 'Creating'} a Memory</Typography>
                    <TextField
                        name={"title"}
                        variant={"outlined"}
                        label={"Title"}
                        fullWidth
                        value={postData.title}
                        onChange={(event) => setPostData({...postData, title: event.target.value})}
                    />
                    <TextField
                        name={"message"}
                        variant={"outlined"}
                        label={"Message"}
                        multiline rows={4}
                        fullWidth
                        value={postData.message}
                        onChange={(event) => setPostData({...postData, message: event.target.value})}
                    />
                    <TextField
                        name={"tags"}
                        variant={"outlined"}
                        label={"tags"}
                        fullWidth
                        value={postData.tags}
                        onChange={(event) => setPostData({...postData, tags: event.target.value.split(',')})}
                    />
                    <div className={`${classes.fileInput} sFile`}>
                        <FileBase
                            name={"sFile"}
                            type={"file"}
                            multiple={false}
                            onDone={({base64}) => setPostData({...postData, selectedFile: base64})}
                        />
                    </div>
                    <Button className={classes.buttonSubmit} variant={"contained"} color={"primary"} size={"large"}
                            type='submit' fullWidth>Submit</Button>
                    <Button variant={"contained"} color={"default"} size={"small"}
                            onClick={clear} fullWidth>Clear</Button>
                </form>
            </Paper>
        </>
    )
}

export default Form