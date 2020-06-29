import React, { useRef, useState } from "react"
import { useEffect } from "react"
import { uploadImage } from "../helpers/api"
import { useAuthToken } from "../context/auth"
import { Button } from "@material-ui/core"

const ImageUpload = ({
  errorText,
  avatarId: userId,
  setAvatarId,
  setParentKey,
}) => {
  const [file, setFile] = useState()
  const [preview, setPreview] = useState()
  const [isValid, setIsValid] = useState(false)
  const filePickerRef = useRef()
  const authToken = useAuthToken()

  const pickImageHandler = (e) => {
    filePickerRef.current.click()
  }

  useEffect(() => {
    if (!file) {
      return
    } else {
      const fileReader = new FileReader()
      fileReader.onload = () => {
        setPreview(fileReader.result)
      }
      fileReader.readAsDataURL(file)
    }
  }, [file])

  const pickedHandler = (e) => {
    if (e?.target?.files || e.target.files.length > 0) {
      const pickedFile = e.target.files[0]
      setFile(pickedFile)
      setIsValid(true)
    } else {
      setIsValid(false)
    }
  }

  const sendImageToServer = (e) => {
    try {
      const formData = new FormData()
      formData.append("image", file)
      formData.append("userId", userId)
      uploadImage(userId, formData, authToken)
        .then((response) => {
          console.log("Image uploaded:", response)
          if (setAvatarId) setAvatarId(false)
          setParentKey(Math.random())
        })
        .catch((error) => console.log("test user error", error))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <input
        id={"avatarpicker-" + userId}
        type="file"
        ref={filePickerRef}
        style={{ display: "none" }}
        accept=".jpg,.png,.jpeg,.webm,.gif"
        onChange={pickedHandler}
      />
      <div>
        <div style={{ border: "1px solid black", height: 270, width: 270 }}>
          {preview && (
            <img
              src={preview}
              alt="Preview"
              style={{ maxWidth: 250, maxHeight: 250 }}
            />
          )}
        </div>
        <Button
          variant="contained"
          color="secondary"
          style={{
            minWidth: 120,
            marginTop: "2em",
            marginBottom: "1em",
            marginRight: "1em",
          }}
          onClick={pickImageHandler}
        >
          Pick Image
        </Button>
        <Button
          variant="contained"
          color="primary"
          style={{ minWidth: 120, marginTop: "2em", marginBottom: "1em" }}
          onClick={sendImageToServer}
        >
          SAVE
        </Button>
      </div>
      {!isValid && <p>{errorText}</p>}
    </div>
  )
}

export default ImageUpload
