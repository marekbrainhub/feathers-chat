import { Outlet } from "react-router-dom"
import { AuthProvider } from "./AuthProvider/AuthProvider"

export const App = () => {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  )
}
