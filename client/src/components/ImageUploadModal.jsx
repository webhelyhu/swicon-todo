import React from "react"
import Modal from "@material-ui/core/Modal"
import Backdrop from "@material-ui/core/Backdrop"
import Fade from "@material-ui/core/Fade"
import ImageUpload from "./ImageUpload"
import {
  Box,
  IconButton,
  Paper,
  Grid,
  Typography,
  makeStyles,
} from "@material-ui/core"
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
  centerContent: {
    maxWidth: "300px",
    margin: "auto",
  },
}))

const ImageUploadModal = ({ avatarId, setAvatarId, setParentKey, history }) => {
  const classes = useStyles()
  // const [modalKey, setModalKey] = useState(Math.random())

  const handleClose = () => {
    setAvatarId(false)
  }

  return (
    <React.Fragment>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={!!avatarId}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={!!avatarId}>
          <Paper className={classes.paper}>
            <Grid container justify="space-between" alignItems="center">
              <Grid item>
                <Typography variant="h6" color="inherit">
                  Upload User Image
                </Typography>
              </Grid>
              <Grid item>
                <IconButton onClick={handleClose}>
                  <Close />
                </IconButton>
              </Grid>
            </Grid>
            <Box>
              <ImageUpload
                // key={modalKey}
                avatarId={avatarId}
                setAvatarId={setAvatarId}
                setParentKey={setParentKey}
              />
            </Box>
          </Paper>
        </Fade>
      </Modal>
    </React.Fragment>
  )
}

export default ImageUploadModal
