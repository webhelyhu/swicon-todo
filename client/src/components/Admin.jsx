import React, { useEffect, useState } from "react"
import { useAuthToken } from "../context/auth"
import { API } from "../helpers/api"

export default function Admin() {
  const authToken = useAuthToken()

  const [data, setData] = useState([])

  useEffect(() => {
    API({ endpoint: "/api/test/user" }, authToken)
      .then((response) => setData(response))
      .catch((error) => console.log("test user error", error))
  }, [setData, authToken])

  return (
    <React.Fragment>
      <h1>Admin</h1>
      <p>You are successfully logged in.</p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </React.Fragment>
  )
}
