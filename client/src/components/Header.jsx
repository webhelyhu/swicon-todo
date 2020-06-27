import React from "react"
import { Link } from "react-router-dom"
import { useAuthToken, useSetAuthToken } from "../context/auth"

const Header = () => {
  const authToken = useAuthToken()
  const setAuthToken = useSetAuthToken()
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home Page</Link>
        </li>
        <li>
          <Link to="/admin">Admin Page</Link>
        </li>
        {!authToken ? (
          <li>
            <Link to="/login">Login</Link>
          </li>
        ) : (
          <React.Fragment>
            <li>
              <button onClick={() => setAuthToken("")}>Logout</button>
            </li>
            <li>
              <Link to="/todos">Todos</Link>
            </li>
          </React.Fragment>
        )}
        <li>
          <Link to="/healthcheck">Healthcheck</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Header
