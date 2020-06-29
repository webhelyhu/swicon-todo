import React from "react"

import UsersTable from "./UsersTable"
import TodoModal from "./TodoModal"
import ImageUploadModal from "./ImageUploadModal"
import { useState } from "react"

export default function Home() {
  const [todosOfUser, setTodosOfUser] = useState()
  const [avatarId, setAvatarId] = useState()
  return (
    <React.Fragment>
      <UsersTable
        todosOfUser={todosOfUser}
        setTodosOfUser={setTodosOfUser}
        setAvatarId={setAvatarId}
      />
      <TodoModal todosOfUser={todosOfUser} setTodosOfUser={setTodosOfUser} />
      <ImageUploadModal avatarId={avatarId} setAvatarId={setAvatarId} />
    </React.Fragment>
  )
}
