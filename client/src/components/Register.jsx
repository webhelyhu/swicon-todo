import React from "react"
import { Link } from "react-router-dom"
import { register } from "../helpers/api"
import { Card, CardContent, Typography, makeStyles } from "@material-ui/core"

import UserPassForm from "./UserPassForm"
import { useAuthToken } from "../context/auth"

const useStyles = makeStyles((theme) => ({
  centerContent: {
    maxWidth: "300px",
    margin: "auto",
  },
}))

export default function Register() {
  const classes = useStyles()
  const authToken = useAuthToken()

  const postRegistration = (username, password) => {
    register({ username, password }).then((response) => {
      if (response.status === 200) {
        console.log(response.message)
      } else if (response.status >= 400) {
        console.error(response.message)
      }
    })
  }

  return (
    <Card>
      <CardContent className={classes.centerContent}>
        <Typography variant="h4">Add new user</Typography>
        <UserPassForm submitAction={postRegistration} submitText="Register" />
        {authToken ? (
          <Link to="/">Back to homepage</Link>
        ) : (
          <Link to="/login">Go to login page.</Link>
        )}
      </CardContent>
    </Card>
  )
}
