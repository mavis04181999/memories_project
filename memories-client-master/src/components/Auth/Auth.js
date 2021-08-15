import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {Avatar, Button, Paper, Grid, Typography, Container} from "@material-ui/core";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Input from './Input.js'
import GoogleLogin from "react-google-login";

import {signIn, signUp} from '../../actions/auth.js'

import {ActionCreators} from '../../reducers/authReducers.js'

import useStyles from './styles.js'
import Icon from './icon.js'

const initialState = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    password2: '',
}

const Auth = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [isSignUp, setIsSignUp] = useState(false)
    const [formData, setFormData] = useState(initialState)
    const classes = useStyles()
    const dispatch = useDispatch()
    const history = useHistory()

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)

    const handleSubmit = (event) => {
        event.preventDefault()

        if(isSignUp) {
            dispatch(signUp(formData, history))
        }else {
            dispatch(signIn(formData, history))
        }

    }

    const handleChange = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value})
    }

    const switchMode = () => {
        setIsSignUp((prevIsSignUp) => !prevIsSignUp)
        handleShowPassword(false)
    }

    const googleSuccess = async (res) => {
        const result = res?.profileObj
        const token = res?.tokenId

        const data = {result, token}

        try {
            dispatch(ActionCreators.auth(data))
            history.push("/")
        } catch (error) {
            console.log(error)
        }

    }

    const googleFailure = (error) => {
        console.log("Google Sign in Failed")
        console.log(error)
    }


    return (
        <Container component={"main"} maxWidth={"xs"}>
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography variant={"h5"}>{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {isSignUp && (
                            <>
                                <Input name={"firstname"} label={"Firstname"} handleChange={handleChange} autoFocus
                                       half/>
                                <Input name={"lastname"} label={"Lastname"} handleChange={handleChange} half/>
                            </>
                        )}
                        <Input name={"email"} label={"Email"} handleChange={handleChange} type={"email"}/>
                        <Input name={"password"} label={"Password"} handleChange={handleChange}
                               type={"password"} handleShowPassword={handleShowPassword}/>
                        {isSignUp && (
                        <Input name={"password2"} label={"Confirm Password"} handleChange={handleChange}
                               type={"password"} />
                        )}
                    </Grid>
                    <Button type={"submit"} fullWidth variant={"contained"} color={"primary"}
                            className={classes.submit}>
                        {isSignUp ? 'Sign Up' : 'Sign In'}
                    </Button>
                    <GoogleLogin
                        clientId={"948887656393-6me8qo0s2uu0pitn4dn788iken9r655l.apps.googleusercontent.com"}
                        render={(renderProps) => (
                            <Button
                                className={classes.googleButton}
                                color={"primary"}
                                fullWidth
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                                startIcon={<Icon/>}
                                variant={"contained"}
                            >
                                Google Sign In
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy={"single_host_origin"}
                    />
                    <Grid container justify={"flex-end"}>
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignUp ? 'Already Have an Account? Sign in' : 'Dont have an Account? Sign Up'}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth