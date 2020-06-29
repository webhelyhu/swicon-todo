import React, { useEffect, useState } from "react"
import { useAuthToken } from "../context/auth"
import { API } from "../helpers/api"
import { withRouter } from "react-router-dom"

import {
  Box,
  Card,
  CardContent,
  IconButton,
  Paper,
  Grid,
  Typography,
  makeStyles,
} from "@material-ui/core"
import Home from "@material-ui/icons/Home"

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
  paragraph: {
    marginTop: "1em",
    marginBottom: "1em",
  },
}))

const Healthcheck = ({ history }) => {
  const classes = useStyles()
  const authToken = useAuthToken()
  const [data, setData] = useState([])

  useEffect(() => {
    API({ endpoint: "/api/test/healthcheck" }, authToken).then((response) =>
      setData(response)
    )
  }, [setData, authToken])

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
              Healthcheck
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
            <Typography variant="h6" color="inherit">
              Checking connection
            </Typography>
            <Box className={classes.paragraph}>
              {data?.healthcheck
                ? "Server is connected"
                : "No HC response from server."}
            </Box>
          </CardContent>
        </Card>
      </Paper>
    </React.Fragment>
  )
}

export default withRouter(Healthcheck)
