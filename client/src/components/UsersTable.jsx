import React, { useEffect, useState } from "react"
import MaterialTable from "material-table"
import { tableIcons } from "./TableIcons"
import { API } from "../helpers/api"
import { useAuthToken } from "../context/auth"
import { Typography } from "@material-ui/core"
import Person from "@material-ui/icons/Person"

export default function UsersTable({ setTodosOfUser, setAvatarId }) {
  const [users, setUsers] = useState([])
  const authToken = useAuthToken()

  useEffect(() => {
    API({ endpoint: "/api/user" }).then((response) => {
      setUsers(response?.users || [])
    })
  }, [setUsers])

  if (!Array.isArray(users)) return <p>Waiting for users...</p>

  console.log("rendering users table. array is", users)

  const renderAvatar = (imgSrc) => {
    if (!imgSrc) return <Person />
    return (
      <img
        src={imgSrc}
        alt="Avatar"
        style={{ width: 50, maxHeight: 100, borderRadius: 25 }}
      />
    )
  }

  const handleUploadAvatar = (id) => {
    setAvatarId(id)
  }

  return (
    <React.Fragment>
      <Typography variant="h4">List of users</Typography>
      <MaterialTable
        columns={[
          {
            title: "Avatar",
            field: "avatar",
            cellStyle: {
              textAlign: "center",
              width: "80px",
              maxWidth: "80px",
            },
            headerStyle: {
              width: "80px",
              maxWidth: "80px",
            },
            render: (rowData) => renderAvatar(rowData.avatar),
          },
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
          {
            icon: tableIcons.Face,
            tooltip: "Upload avatar",
            disabled: !authToken,
            onClick: (event, rowData) => {
              handleUploadAvatar(rowData.id)
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
