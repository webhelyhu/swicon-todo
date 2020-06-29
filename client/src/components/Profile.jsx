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
  const [reload, setReload] = useState(Math.random())
  const classes = useStyles()

  useEffect(() => {
    API({ endpoint: "/api/test/user" }, authToken)
      .then((response) => setData(response))
      .catch((error) => console.log("test user error", error))
  }, [setData, authToken, reload])

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

        <Typography variant="body1" className={classes.paragraph}>
          On this page you can find information about the logged in user.
        </Typography>
        <Typography variant="body1" className={classes.paragraph}>
          You are logged in with the username {data?.user?.username}.
        </Typography>
        <Typography variant="body1" className={classes.paragraph}>
          Your avatar link is {data?.user?.avatar}.
        </Typography>
        <Avatar
          src={data?.user?.avatar}
          className={classes.large}
          variant="square"
        />
        {data?.user?.id && (
          <React.Fragment>
            <Typography variant="h6" color="inherit">
              You can upload new avatar here:
            </Typography>
            <ImageUpload
              key={reload}
              avatarId={data.user.id}
              setParentKey={setReload}
            />
          </React.Fragment>
        )}
      </Paper>
    </React.Fragment>
  )
}

export default withRouter(Profile)
