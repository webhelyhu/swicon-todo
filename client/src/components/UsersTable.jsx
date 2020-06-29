import React, { useEffect, useState } from "react"
import MaterialTable from "material-table"
import { tableIcons } from "./TableIcons"
import { API } from "../helpers/api"
import { useAuthToken } from "../context/auth"
import { Typography } from "@material-ui/core"

export default function UsersTable({ setTodosOfUser }) {
  const [users, setUsers] = useState([])
  const authToken = useAuthToken()

  useEffect(() => {
    API({ endpoint: "/api/user" }).then((response) => {
      setUsers(response?.users || [])
    })
  }, [setUsers])

  if (!Array.isArray(users)) return <p>Waiting for users...</p>

  return (
    <React.Fragment>
      <Typography variant="h4">List of users</Typography>
      <MaterialTable
        columns={[
          { title: "ID", field: "id" },
          { title: "Username", field: "username" },
        ]}
        data={users}
        title="Users"
        icons={tableIcons}
        actions={[
          {
            icon: tableIcons.ListAlt,
            tooltip: "Show Todos",
            disabled: !authToken,
            onClick: (event, rowData) => {
              setTodosOfUser(rowData.id)
            },
          },
        ]}
        options={{
          actionsColumnIndex: -1,
        }}
      />
    </React.Fragment>
  )
}
