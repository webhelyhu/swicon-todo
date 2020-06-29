import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Modal from "@material-ui/core/Modal"
import Backdrop from "@material-ui/core/Backdrop"
import Fade from "@material-ui/core/Fade"
import Close from "@material-ui/icons/Close"
import TodoTable from "./TodoTable"
import { IconButton, Paper, Grid, Typography } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "0px solid blue",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    minWidth: "50vw",
  },
}))

export default function TodoModal({ todosOfUser, setTodosOfUser }) {
  const classes = useStyles()
  const [modalKey, setModalKey] = useState(Math.random())

  const handleClose = () => {
    setTodosOfUser(false)
  }

  return (
    <React.Fragment>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={!!todosOfUser}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={!!todosOfUser}>
          <Paper className={classes.paper}>
            <Grid container justify="space-between">
              <Grid item>
                <Typography variant="h4" color="inherit">
                  Todos of User id {todosOfUser}
                </Typography>
              </Grid>
              <Grid item>
                <IconButton onClick={handleClose}>
                  <Close />
                </IconButton>
              </Grid>
            </Grid>

            <TodoTable
              key={modalKey}
              todosOfUser={todosOfUser}
              setModalKey={setModalKey}
            />
          </Paper>
        </Fade>
      </Modal>
    </React.Fragment>
  )
}
