import { useNavigate } from "react-router-dom"
import { AuthContext } from "./AuthContext"
import { PropsWithChildren, useEffect, useState } from "react"
import { login } from "../shared/auth"
import { AuthenticationResult } from "@feathersjs/authentication"

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate()

  const [user, setUser] = useState<AuthenticationResult>({})

  useEffect(() => {
    (async () => {
      try {
        const user = await login()
        setUser(user)
        navigate('/app')
      } catch {
        navigate('/login')
      }
    })()
  }, [])

  return (
    <AuthContext.Provider value={user}>
      {children}
    </AuthContext.Provider>
  )
}
