import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();
const SetAuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const TOKENNAME = "token-sw-todo"
  const existingTokens = JSON.parse(localStorage.getItem(TOKENNAME))
  const [authToken, setAuthToken] = useState(existingTokens)

  const setToken = (data) => {
    console.log("setToken called. current token is", authToken)
    if (!data || typeof data !== 'string' || data.length < 10) {
      // possible not valid token.
      // assume we want to remove token (to log out)
      console.log("Removing token")
      setAuthToken("")
      localStorage.removeItem(TOKENNAME)
    } else {
      console.log("Set new token", data)
      localStorage.setItem(TOKENNAME, JSON.stringify(data))
      setAuthToken(data)
    }
  }

  return (
    <AuthContext.Provider value={authToken}>
      <SetAuthContext.Provider value={setToken}>
        {children}
      </SetAuthContext.Provider>
    </AuthContext.Provider>
  )
}

export const useAuthToken = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuthToken must be used within AuthProvider')
  }
  return context
}

export const useSetAuthToken = () => {
  const context = useContext(SetAuthContext)
  if (context === undefined) {
    throw new Error('useSetAuthToken must be used within AuthProvider')
  }
  return context
}
