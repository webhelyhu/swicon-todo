import React, { useEffect, useState } from "react"
import { useAuthToken } from "../context/auth"
import { API } from "../helpers/api"

export default function Healthcheck() {
  const authToken = useAuthToken()

  const [data, setData] = useState([])

  useEffect(() => {
    API({ endpoint: "/api/test/healthcheck" }, authToken).then((response) =>
      setData(response)
    )
  }, [setData, authToken])

  return (
    <React.Fragment>
      <h1>Healthcheck</h1>
      <p>Checking if server is connected.</p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </React.Fragment>
  )
}
