import React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import PrivateRoute from "./PrivateRoute"
import { AuthProvider } from "../context/auth"

import Admin from "./Admin"
import Home from "./Home"
import Login from "./Login"
import Register from "./Register"

import "../styles/App.css"
import Healthcheck from "./Healthcheck"
import Header from "./Header"
import Todos from "./Todos"

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Route path="/healthcheck">
          <Healthcheck />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Register />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
        <PrivateRoute path="/admin">
          <Admin />
        </PrivateRoute>
        <PrivateRoute path="/todos">
          <Todos />
        </PrivateRoute>
      </Router>
    </AuthProvider>
  )
}
