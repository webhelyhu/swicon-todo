import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Modal from "@material-ui/core/Modal"
import Backdrop from "@material-ui/core/Backdrop"
import Fade from "@material-ui/core/Fade"
import TodoModalTable from "./TodoTable"

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
  },
}))

export default function TodoModal({ todosOfUser, setTodosOfUser }) {
  const classes = useStyles()

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
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Todos of User id {todosOfUser}</h2>
            <p id="transition-modal-description">
              To close, click:
              <button onClick={handleClose}>Close</button>
            </p>

            <TodoModalTable todosOfUser={todosOfUser} />
          </div>
        </Fade>
      </Modal>
    </React.Fragment>
  )
}
