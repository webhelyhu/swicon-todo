import React from "react"

import UsersTable from "./UsersTable"
import TodoModal from "./TodoModal"
import ImageUploadModal from "./ImageUploadModal"
import { useState } from "react"

export default function Home() {
  const [todosOfUser, setTodosOfUser] = useState()
  const [avatarId, setAvatarId] = useState()
  const [usersTableKey, setUsersTableKey] = useState(Math.random())
  return (
    <React.Fragment>
      <UsersTable
        key={usersTableKey}
        todosOfUser={todosOfUser}
        setTodosOfUser={setTodosOfUser}
        setAvatarId={setAvatarId}
        setUsersTableKey={setUsersTableKey}
      />
      <TodoModal todosOfUser={todosOfUser} setTodosOfUser={setTodosOfUser} />
      <ImageUploadModal
        avatarId={avatarId}
        setAvatarId={setAvatarId}
        setParentKey={setUsersTableKey}
      />
    </React.Fragment>
  )
}
