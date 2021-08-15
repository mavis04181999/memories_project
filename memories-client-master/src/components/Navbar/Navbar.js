import React, {useState, useEffect} from 'react'
import {Link, useHistory, useLocation} from 'react-router-dom'
import {AppBar, Typography, Toolbar, Button, Avatar} from "@material-ui/core";
import memories from "../../images/memories.PNG";
import {useDispatch} from 'react-redux'
import useStyles from './styles.js'
import {ActionCreators} from "../../reducers/authReducers";
import decode from "jwt-decode"

const Navbar = () => {
    const classes = useStyles()

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation()

    useEffect(() => {
        const token = user?.token

        if (token) {
            const decodedToken = decode(token)

            if (decodedToken.exp * 1000 < new Date().getTime()) {
                logOutUser()
            }
        }
        // JWT...
        setUser(JSON.parse(localStorage.getItem('user')))
    }, [location])

    const logOutUser = () => {
        dispatch(ActionCreators.logout(user))
        history.push("/auth")
        setUser(null)
    }


    return (
        <>
            <AppBar className={classes.appBar} position={"static"} color={"inherit"}>
                <div className={classes.brandContainer}>
                    <Typography component={Link} to={"/"} className={classes.heading} variant={"h4"}
                                align={"center"}>Memories</Typography>
                    {/*<img className={classes.image} src={memories} alt={"memories"} height={"60"}/>*/}
                </div>
                <Toolbar className={classes.toolbar}>
                    {user ?
                        (
                            <div className={classes.profile}>
                                <Avatar className={classes.purple} alt={user.result.name}
                                        src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                                <Typography className={classes.userName} variant={"h6"}>{user.result.name}</Typography>
                                <Button size={"small"} className={classes.logout} variant={"contained"} color={"secondary"}
                                        onClick={logOutUser}>Logout</Button>
                            </div>
                        ) :
                        (
                                <Button size={"small"} component={Link} to={"/auth"} variant={"contained"} color={"primary"} >Sign
                                    In</Button>

                        )
                    }
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar