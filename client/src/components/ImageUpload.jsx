import React, { useRef, useState } from "react"
import { useEffect } from "react"
import { uploadImage } from "../helpers/api"
import { useAuthToken } from "../context/auth"

const ImageUpload = ({
  errorText,
  avatarId: userId,
  setAvatarId,
  setModalKey,
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
        .then((response) => console.log(response))
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
        <div>
          Preview
          {preview && (
            <img
              src={preview}
              alt="Preview"
              style={{ maxWidth: 200, maxHeight: 300 }}
            />
          )}
        </div>
        <button type="button" onClick={pickImageHandler}>
          PICK IMAGE
        </button>
      </div>
      {!isValid && <p>{errorText}</p>}
      <div>
        <button type="button" onClick={sendImageToServer}>
          Send Image
        </button>
      </div>
    </div>
  )
}

export default ImageUpload
