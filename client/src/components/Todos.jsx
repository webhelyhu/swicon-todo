import React, { useState } from "react"
import TodoTable from "./TodoTable"

export default function Todos() {
  const [todosOfUser, setTodosOfUser] = useState()
  const [modalKey, setModalKey] = useState(Math.random())

  return (
    <React.Fragment>
      <h1>Todos</h1>
      <TodoTable
        key={modalKey}
        todosOfUser={todosOfUser}
        setTodosOfUser={setTodosOfUser}
        setModalKey={setModalKey}
      />
    </React.Fragment>
  )
}
