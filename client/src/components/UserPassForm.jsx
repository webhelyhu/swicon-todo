import React, { useState } from "react"
import {
  Box,
  Button,
  FormGroup,
  TextField,
  makeStyles,
} from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  button: {
    ...theme.typography.tab,
    minWidth: 10,
    marginTop: "2em",
    marginBottom: "1em",
  },
  textfield: {
    marginTop: "0.7em",
    marginBottom: "0.7em",
    maxWidth: "250px",
  },
}))

export default function UserPassForm({ submitText, submitAction }) {
  const classes = useStyles()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        submitAction(username, password)
      }}
    >
      <Box>
        <FormGroup>
          <TextField
            label="Username"
            name="username"
            type="text"
            placeholder="username"
            value={username}
            className={classes.textfield}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormGroup>
      </Box>
      <Box>
        <FormGroup>
          <TextField
            label="Password"
            name="password"
            type="password"
            placeholder="password"
            className={classes.textfield}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>
      </Box>
      <Button
        variant="contained"
        color="secondary"
        type="submit"
        className={classes.button}
      >
        {submitText}
      </Button>
    </form>
  )
}
