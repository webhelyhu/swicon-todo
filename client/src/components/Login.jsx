import React, { useState } from "react"
import { Link, Redirect, useHistory } from "react-router-dom"
import { useSetAuthToken, useAuthToken } from "../context/auth"
import { login } from "../helpers/api"

export default function Login(props) {
  const history = useHistory()
  // const [isLoggedIn, setLoggedIn] = useState(false)
  const [username, setUsername] = useState("") // local form field
  const [password, setPassword] = useState("") // local form field
  const authToken = useAuthToken()
  const setAuthToken = useSetAuthToken()

  const referer = history?.location?.state?.referer || "/"

  const postLogin = (e) => {
    e.preventDefault()
    login({ username, password })
      .then((response) => {
        if (response.accessToken) {
          setAuthToken(response.accessToken)
          // setLoggedIn(true)
        } else {
          console.error(response.reason)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }
  if (authToken) {
    return <Redirect to={referer} />
  }

  return (
    <div>
      <form onSubmit={postLogin}>
        <label htmlFor="username">Username: </label>
        <input
          name="username"
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password: </label>
        <input
          name="password"
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign In</button>
      </form>
      <Link to="/signup">Don't have an account? Jump to Signup page!</Link>
    </div>
  )
}
