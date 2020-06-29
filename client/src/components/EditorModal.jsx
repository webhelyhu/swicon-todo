import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Modal from "@material-ui/core/Modal"
import Backdrop from "@material-ui/core/Backdrop"
import Fade from "@material-ui/core/Fade"
import EditorForm from "./EditorForm"
import { IconButton, Paper, Grid, Typography } from "@material-ui/core"
import Close from "@material-ui/icons/Close"

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

const EditorModal = ({ edited, setEdited, newTodoForUserId, setModalKey }) => {
  const classes = useStyles()

  const handleClose = () => {
    setEdited(false)
  }

  return (
    <React.Fragment>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={!!edited}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={!!edited}>
          <Paper className={classes.paper}>
            <Grid container justify="space-between">
              <Grid item>
                <Typography variant="h4" color="inherit">
                  Todo editor
                </Typography>
              </Grid>
              <Grid item>
                <IconButton onClick={handleClose}>
                  <Close />
                </IconButton>
              </Grid>
            </Grid>

            <EditorForm
              edited={edited}
              setEdited={setEdited}
              newTodoForUserId={newTodoForUserId}
              setModalKey={setModalKey}
            />
          </Paper>
        </Fade>
      </Modal>
    </React.Fragment>
  )
}

export default EditorModal
