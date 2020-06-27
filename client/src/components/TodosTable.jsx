import React, { useEffect, useState } from "react"

import { useAuthToken } from "../context/auth"
import { API } from "../helpers/api"

export default function TodosTable() {
  const authToken = useAuthToken()
  const [todos, setTodos] = useState([])

  useEffect(() => {
    API({ endpoint: "/api/todo" }, authToken).then((response) => {
      setTodos(response?.todos || [])
    })
  }, [setTodos, authToken])

  const removeTodo = (id) => {
    API({ endpoint: `/api/todo/${id}`, method: "DELETE" }, authToken).then(
      (response) => {
        console.log("Delete todo:", response)
      }
    )
  }

  if (!Array.isArray(todos)) return <p>Waiting for todos...</p>

  return (
    <React.Fragment>
      <h1>List of todos</h1>
      <ol>
        {todos.map((todo, i) => {
          return (
            <li key={todo.id}>
              Id: {todo.id} {todo.todotitle} {todo.todobody} owner:{" "}
              {todo?.owner}
              <button onClick={() => removeTodo(todo.id)}>DELETE</button>
            </li>
          )
        })}
      </ol>
    </React.Fragment>
  )
}
