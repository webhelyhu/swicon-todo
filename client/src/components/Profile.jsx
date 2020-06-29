import React, { useEffect, useState } from "react"
import { useAuthToken } from "../context/auth"
import { API } from "../helpers/api"
import ImageUpload from "./ImageUpload"
import Home from "@material-ui/icons/Home"
import { withRouter } from "react-router-dom"
import {
  IconButton,
  Paper,
  Grid,
  Typography,
  makeStyles,
  Box,
  Avatar,
} from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "0px solid blue",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    minWidth: "50vw",
  },
  paragraph: {
    marginTop: "1em",
    marginBottom: "1em",
  },
  large: {
    width: theme.spacing(9),
    height: theme.spacing(9),
  },
}))

const Profile = ({ history }) => {
  const authToken = useAuthToken()
  const [data, setData] = useState({})
  const classes = useStyles()

  useEffect(() => {
    API({ endpoint: "/api/test/user" }, authToken)
      .then((response) => setData(response))
      .catch((error) => console.log("test user error", error))
  }, [setData, authToken])

  return (
    <React.Fragment>
      <Paper className={classes.paper}>
        <Grid container justify="space-between">
          <Grid item>
            <Typography variant="h4" color="inherit">
              Profile page
            </Typography>
          </Grid>
          <Grid item>
            <IconButton onClick={() => history.push("/")}>
              <Home />
            </IconButton>
          </Grid>
        </Grid>
        <Typography variant="p">
          <Box className={classes.paragraph}>
            On this page you can find information about the logged in user.
          </Box>
          <Box className={classes.paragraph}>
            You are logged in with the username {data?.user?.username}.
          </Box>
          <Box className={classes.paragraph}>
            Your avatar link is {data?.user?.avatar}.
          </Box>
          <Box className={classes.paragraph}>
            <Avatar
              src={data?.user?.avatar}
              className={classes.large}
              variant="square"
            />
          </Box>
          {data?.user?.id && (
            <React.Fragment>
              <Typography variant="h6" color="inherit">
                You can upload new avatar here:
              </Typography>
              <Box className={classes.paragraph}>
                <ImageUpload userId={data.user.id} />
              </Box>
            </React.Fragment>
          )}
        </Typography>
      </Paper>
    </React.Fragment>
  )
}

export default withRouter(Profile)
