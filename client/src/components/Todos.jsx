import React, { useState } from "react"
import { useAuthToken } from "../context/auth"
import { API } from "../helpers/api"
import TodoTable from "./TodoTable"

export default function Todos() {
  const authToken = useAuthToken()
  const [todotitle, setTodotitle] = useState("")
  const [todobody, setTodobody] = useState("")
  const [todosOfUser, setTodosOfUser] = useState()
  const [modalKey, setModalKey] = useState(Math.random())

  const submitAddTodo = (e) => {
    e.preventDefault()
    API(
      {
        endpoint: "/api/todo",
        method: "POST",
        data: { todobody, todotitle },
      },
      authToken
    )
      .then((response) => {
        if (response?.status === 200) {
          console.log("Success creating todo")
        } else {
          console.log("Todo create error: status is not 200", response.reason)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }
  return (
    <React.Fragment>
      <h1>Todos</h1>
      <TodoTable
        key={modalKey}
        todosOfUser={todosOfUser}
        setTodosOfUser={setTodosOfUser}
        setModalKey={setModalKey}
      />
      <form className="addtodo" onSubmit={submitAddTodo}>
        <div>New Todo</div>
        <div>
          <label htmlFor="input__todotitle">Title</label>
          <input
            id="input__todotitle"
            type="text"
            placeholder="todo title"
            value={todotitle}
            onChange={(e) => setTodotitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="input__todobody">Body</label>
          <input
            id="input__todobody"
            type="text"
            placeholder="todo body"
            value={todobody}
            onChange={(e) => setTodobody(e.target.value)}
          />
        </div>
        <button>Add Todo</button>
      </form>
    </React.Fragment>
  )
}
