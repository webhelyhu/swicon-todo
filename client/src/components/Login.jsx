import React from "react"
import { Link, Redirect, withRouter } from "react-router-dom"
import {
  Card,
  CardContent,
  IconButton,
  Paper,
  Grid,
  Typography,
  makeStyles,
} from "@material-ui/core"
import Home from "@material-ui/icons/Home"

import { useSetAuthToken, useAuthToken } from "../context/auth"
import { login } from "../helpers/api"
import UserPassForm from "./UserPassForm"

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "0px solid blue",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    minWidth: "50vw",
  },
  centerContent: {
    maxWidth: "300px",
    margin: "auto",
  },
}))

const Login = ({ history }) => {
  const classes = useStyles()
  const authToken = useAuthToken()
  const setAuthToken = useSetAuthToken()

  const referer = history?.location?.state?.referer || "/"

  const postLogin = (username, password) => {
    login({ username, password })
      .then((response) => {
        if (response.accessToken) {
          setAuthToken(response.accessToken)
        } else {
          console.error(response.reason)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }
  if (authToken) {
    return <Redirect to={referer} />
  }

  return (
    <React.Fragment>
      <Paper className={classes.paper}>
        <Grid
          container
          justify="space-between"
          className={classes.centerContent}
        >
          <Grid item>
            <Typography variant="h4" color="inherit">
              Login
            </Typography>
          </Grid>
          <Grid item>
            <IconButton onClick={() => history.push("/")}>
              <Home />
            </IconButton>
          </Grid>
        </Grid>

        <Card className={classes.centerContent}>
          <CardContent>
            <UserPassForm submitAction={postLogin} submitText="Sign In" />
            <Link to="/adduser">
              Don't have a user yet? Go to Add User page!
            </Link>
          </CardContent>
        </Card>
      </Paper>
    </React.Fragment>
  )
}

export default withRouter(Login)
