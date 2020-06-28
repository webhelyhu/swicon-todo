import React from "react"

import UsersTable from "./UsersTable"
import TodoModal from "./TodoModal"
import { useState } from "react"

export default function Home() {
  const [todosOfUser, setTodosOfUser] = useState()
  return (
    <React.Fragment>
      <UsersTable todosOfUser={todosOfUser} setTodosOfUser={setTodosOfUser} />
      <TodoModal todosOfUser={todosOfUser} setTodosOfUser={setTodosOfUser} />
    </React.Fragment>
  )
}
