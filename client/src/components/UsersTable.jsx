import React, { useEffect, useState } from "react"

import { API } from "../helpers/api"

export default function UsersTable() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    API({ endpoint: "/api/user" }).then((response) => {
      console.log("users response", response)
      setUsers(response?.users || [])
    })
  }, [setUsers])

  if (!Array.isArray(users)) return <p>Waiting for users...</p>

  return (
    <React.Fragment>
      <h1>List of users</h1>
      <ol>
        {users.map((user, i) => {
          return (
            <li key={user.id}>
              Id: {user.id} {JSON.stringify(user, null, 2)}
              <button onClick={() => console.log("Will be...")}>
                Show todos!
              </button>
            </li>
          )
        })}
      </ol>
    </React.Fragment>
  )
}
