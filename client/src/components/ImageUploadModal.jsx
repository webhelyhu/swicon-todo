import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Modal from "@material-ui/core/Modal"
import Backdrop from "@material-ui/core/Backdrop"
import Fade from "@material-ui/core/Fade"
import ImageUpload from "./ImageUpload"

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

export default function ImageUploadModal({
  avatarId,
  setAvatarId,
  setUsersTableKey,
}) {
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
          <div className={classes.paper}>
            <h2 id="transition-modal-title">
              Uploading image to user id {avatarId}
            </h2>
            <p id="transition-modal-description">
              To close, click:
              <button onClick={handleClose}>Close</button>
            </p>

            <ImageUpload
              // key={modalKey}
              avatarId={avatarId}
              setAvatarId={setAvatarId}
              setUsersTableKey={setUsersTableKey}
            />
          </div>
        </Fade>
      </Modal>
    </React.Fragment>
  )
}
