import React from "react"
import { Link, Redirect, useHistory } from "react-router-dom"
import { Card, CardContent, Typography, makeStyles } from "@material-ui/core"

import { useSetAuthToken, useAuthToken } from "../context/auth"
import { login } from "../helpers/api"
import UserPassForm from "./UserPassForm"

const useStyles = makeStyles((theme) => ({
  centerContent: {
    maxWidth: "300px",
    margin: "auto",
  },
}))

export default function Login(props) {
  const history = useHistory()
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
    <Card>
      <CardContent className={classes.centerContent}>
        <Typography variant="h4">Login</Typography>

        <UserPassForm submitAction={postLogin} submitText="Sign In" />
        <Link to="/adduser">Don't have a user yet? Go to Add User page!</Link>
      </CardContent>
    </Card>
  )
}
