import React, { useEffect, useState } from "react"
import MaterialTable, { MTableToolbar } from "material-table"
import { tableIcons } from "./TableIcons"
import { API } from "../helpers/api"
import { useAuthToken } from "../context/auth"
import { Typography, Avatar } from "@material-ui/core"

export default function UsersTable({ setTodosOfUser, setAvatarId }) {
  const [users, setUsers] = useState([])
  const authToken = useAuthToken()

  useEffect(() => {
    API({ endpoint: "/api/user" }).then((response) => {
      setUsers(response?.users || [])
    })
  }, [setUsers])

  if (!Array.isArray(users)) return <p>Waiting for users...</p>

  // console.log("rendering users table. array is", users)

  const renderUserField = (rowData) => {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "85px",
            textAlign: "center",
          }}
        >
          {renderAvatar(rowData.avatar, rowData.username)}
        </div>
        {rowData.username}
      </div>
    )
  }

  const renderAvatar = (imgSrc, username) => {
    if (!imgSrc) return <Avatar variant="square">{username[0]}</Avatar>
    return <Avatar alt="Avatar" src={imgSrc} variant="square" />
  }

  const handleUploadAvatar = (id) => {
    setAvatarId(id)
  }

  return (
    <React.Fragment>
      <Typography variant="h4">List of users</Typography>
      <MaterialTable
        components={{
          Toolbar: (props) => (
            <div style={{ backgroundColor: "#e8eaf5" }}>
              <MTableToolbar {...props} />
            </div>
          ),
        }}
        columns={[
          { title: "ID", field: "id" },
          {
            title: "User",
            headerStyle: { paddingLeft: "100px" },
            defaultSort: "asc",
            field: "username",
            render: (rowData) => renderUserField(rowData),
          },
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
