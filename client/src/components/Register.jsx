import React from "react"
import { Link, withRouter } from "react-router-dom"
import { register } from "../helpers/api"

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

import UserPassForm from "./UserPassForm"
import { useAuthToken } from "../context/auth"

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

const Register = ({ history }) => {
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
    <React.Fragment>
      <Paper className={classes.paper}>
        <Grid
          container
          justify="space-between"
          className={classes.centerContent}
        >
          <Grid item>
            <Typography variant="h4" color="inherit">
              Add new user
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
            <UserPassForm
              submitAction={postRegistration}
              submitText="Register"
            />
            {authToken ? (
              <Link to="/">Back to homepage</Link>
            ) : (
              <Link to="/login">Go to login page.</Link>
            )}
          </CardContent>
        </Card>
      </Paper>
    </React.Fragment>
  )
}

export default withRouter(Register)
