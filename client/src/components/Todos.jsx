import React, { useState } from "react"
import TodoTable from "./TodoTable"
import Home from "@material-ui/icons/Home"
import { withRouter } from "react-router-dom"
import {
  IconButton,
  Paper,
  Grid,
  Typography,
  makeStyles,
} from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "0px solid blue",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    minWidth: "50vw",
  },
}))

const Todos = ({ history }) => {
  const classes = useStyles()

  const [todosOfUser, setTodosOfUser] = useState()
  const [modalKey, setModalKey] = useState(Math.random())

  return (
    <React.Fragment>
      <Paper className={classes.paper}>
        <Grid container justify="space-between">
          <Grid item>
            <Typography variant="h4" color="inherit">
              All Todos
            </Typography>
          </Grid>
          <Grid item>
            <IconButton onClick={() => history.push("/")}>
              <Home />
            </IconButton>
          </Grid>
        </Grid>

        <TodoTable
          key={modalKey}
          todosOfUser={todosOfUser}
          setTodosOfUser={setTodosOfUser}
          setModalKey={setModalKey}
        />
      </Paper>
    </React.Fragment>
  )
}

export default withRouter(Todos)
