import React, { useEffect, useState } from "react"
import { useAuthToken } from "../context/auth"
import { API } from "../helpers/api"

export default function Todos() {
  const authToken = useAuthToken()

  const [data, setData] = useState([])

  useEffect(() => {
    API({ endpoint: "/api/todo" }, authToken).then((response) =>
      setData(response)
    )
  }, [setData, authToken])

  return (
    <React.Fragment>
      <h1>Todos</h1>
      <p>See all todos:</p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </React.Fragment>
  )
}
