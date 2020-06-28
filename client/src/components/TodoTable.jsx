import React, { useState, useEffect } from "react"
import { API } from "../helpers/api"
import MaterialTable from "material-table"

import { tableIcons } from "./TableIcons"
import { useAuthToken } from "../context/auth"

export default function TodoTable({ todosOfUser, setTodosOfUser }) {
  const authToken = useAuthToken()
  const [todos, setTodos] = useState([])

  useEffect(() => {
    API(
      {
        endpoint: !!todosOfUser
          ? `/api/todosofuser/${todosOfUser}`
          : "/api/todo",
      },
      authToken
    ).then((response) => {
      console.log("received todos for TodoTable", response)
      setTodos(response?.todos || [])
    })
  }, [setTodos, todosOfUser, authToken])

  const editTodo = (todoId) => {
    console.log("Edit todo", todoId)
  }
  const removeTodo = (todoId) => {
    console.log("REMOVE todo", todoId)
  }
  const addNewTodo = () => {
    console.log("Add new todo for user", todosOfUser)
  }

  if (!Array.isArray(todos)) return <p>Waiting for todos...</p>

  // console.log("for one user?, TodoTable array:", !!todosOfUser, todos)

  return (
    <MaterialTable
      columns={[
        { title: "ID", field: "id" },
        { title: "Todo Title", field: "todotitle" },
        { title: "Todo Body", field: "todobody" },
      ]}
      data={todos}
      title={!!todosOfUser ? "Todos for selected user" : "All todos"}
      icons={tableIcons}
      actions={[
        {
          icon: tableIcons.Edit,
          tooltip: "Edit Todo",
          onClick: (event, rowData) => {
            editTodo(rowData.id)
          },
        },
        {
          icon: tableIcons.Delete,
          tooltip: "Remove Todo",
          onClick: (event, rowData) => {
            removeTodo(rowData.id)
          },
        },
        {
          icon: tableIcons.Add,
          disabled: !todosOfUser,
          tooltip: "Add New Todo",
          isFreeAction: true,
          onClick: (event, rowData) => {
            addNewTodo(rowData.id)
          },
        },
      ]}
      options={{
        actionsColumnIndex: -1,
      }}
    />
  )
}
