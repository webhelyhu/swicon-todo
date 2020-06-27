import React from "react"
import { Route, Redirect } from "react-router-dom"
import { useAuthToken } from "../context/auth"

export default function PrivateRoute({ children, ...rest }) {
  const authToken = useAuthToken()

  return (
    <Route {...rest}>
      {authToken ? (
        children
      ) : (
        <Redirect
          to={{ pathname: "/login", state: { referer: { ...rest }.path } }}
        />
      )}
    </Route>
  )
}
