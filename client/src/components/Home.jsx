import React from "react"

import UsersTable from "./UsersTable"

export default function Home() {
  return (
    <React.Fragment>
      <h1>Home</h1>
      <p>Choose a user:</p>
      <UsersTable />
    </React.Fragment>
  )
}
