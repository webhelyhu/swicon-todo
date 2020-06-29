import React, { useState, useEffect } from "react"
import { API } from "../helpers/api"
import MaterialTable, { MTableToolbar } from "material-table"

import { tableIcons } from "./TableIcons"
import { useAuthToken } from "../context/auth"
import EditorModal from "./EditorModal"

const columnsForUser = [
  { title: "ID", field: "id" },
  { title: "Todo Title", field: "todotitle" },
  { title: "Todo Body", field: "todobody" },
]

const columnsForAll = [
  { title: "ID", field: "id" },
  { title: "Owner ID", field: "owner" },
  { title: "Todo Title", field: "todotitle" },
  { title: "Todo Body", field: "todobody" },
]

const TodoTable = ({ todosOfUser, setModalKey }) => {
  const authToken = useAuthToken()
  const [todos, setTodos] = useState([])
  const [edited, setEdited] = useState()

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
    setEdited(todoId)
  }

  const removeTodo = (todoId) => {
    console.log("REMOVE todo", todoId)

    API(
      {
        endpoint: `/api/todo/${todoId}`,
        method: "DELETE",
      },
      authToken
    ).then((response) => {
      console.log("DELETE todo response", response)
      // reload ourselves!
      setModalKey(Math.random())
    })
  }

  const addNewTodo = () => {
    if (!todosOfUser) {
      console.log("AddNewTodo called, but no user ID present!")
    } else {
      console.log("Add new todo for user", todosOfUser)
      setEdited(true)
    }
  }

  if (!Array.isArray(todos)) return <p>Waiting for todos...</p>

  // console.log("for one user?, TodoTable array:", !!todosOfUser, todos)

  return (
    <React.Fragment>
      <MaterialTable
        components={{
          Toolbar: (props) => (
            <div style={{ backgroundColor: "#e8eaf5" }}>
              <MTableToolbar {...props} />
            </div>
          ),
        }}
        columns={!!todosOfUser ? columnsForUser : columnsForAll}
        data={todos}
        title={!!todosOfUser ? "Todos for User" : "All todos"}
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
              addNewTodo()
            },
          },
        ]}
        options={{
          actionsColumnIndex: -1,
        }}
      />
      <EditorModal
        edited={edited}
        setEdited={setEdited}
        newTodoForUserId={todosOfUser}
        setModalKey={setModalKey}
      />
    </React.Fragment>
  )
}

export default TodoTable
