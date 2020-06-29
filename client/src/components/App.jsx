import React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import PrivateRoute from "./PrivateRoute"
import { AuthProvider } from "../context/auth"
import ThemeProvider from "@material-ui/styles/ThemeProvider"

import theme from "../mui/theme"
import Header from "./Header"

import Home from "./Home"
import Login from "./Login"
import Register from "./Register"
import Healthcheck from "./Healthcheck"
import Todos from "./Todos"
import Profile from "./Profile"

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <Router>
          <Header />
          <Route path="/healthcheck">
            <Healthcheck />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/adduser">
            <Register />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <PrivateRoute path="/profile">
            <Profile />
          </PrivateRoute>
          <PrivateRoute path="/todos">
            <Todos />
          </PrivateRoute>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  )
}
