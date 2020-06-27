import React, { useEffect, useState } from "react"
import MaterialTable from "material-table"

import { API } from "../helpers/api"

import { forwardRef } from "react"

import AddBox from "@material-ui/icons/AddBox"
import ArrowUpward from "@material-ui/icons/ArrowUpward"
import Check from "@material-ui/icons/Check"
import ChevronLeft from "@material-ui/icons/ChevronLeft"
import ChevronRight from "@material-ui/icons/ChevronRight"
import Clear from "@material-ui/icons/Clear"
import DeleteOutline from "@material-ui/icons/DeleteOutline"
import Edit from "@material-ui/icons/Edit"
import FilterList from "@material-ui/icons/FilterList"
import FirstPage from "@material-ui/icons/FirstPage"
import LastPage from "@material-ui/icons/LastPage"
import Remove from "@material-ui/icons/Remove"
import SaveAlt from "@material-ui/icons/SaveAlt"
import Search from "@material-ui/icons/Search"
import ViewColumn from "@material-ui/icons/ViewColumn"
import ListAlt from "@material-ui/icons/ListAlt"

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  ListAlt: forwardRef((props, ref) => <ListAlt {...props} ref={ref} />),
}

export default function UsersTable() {
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
            icon: () => <ListAlt />,
            tooltip: "Show Todos",
            onClick: (event, rowData) => {
              console.log("Show todo for user id ", rowData.id)
            },
          },
        ]}
      />
    </React.Fragment>
  )
}
