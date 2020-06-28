import React, { useEffect, useState } from "react"
import MaterialTable from "material-table"
import { tableIcons } from "./TableIcons"
import { API } from "../helpers/api"

export default function UsersTable({ setTodosOfUser }) {
  const [users, setUsers] = useState([])

  useEffect(() => {
    API({ endpoint: "/api/user" }).then((response) => {
      setUsers(response?.users || [])
    })
  }, [setUsers])

  if (!Array.isArray(users)) return <p>Waiting for users...</p>

  return (
    <React.Fragment>
      <h1>List of users</h1>
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
