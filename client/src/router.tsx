import { createBrowserRouter } from 'react-router-dom'
import { App } from './App'
import { LoginPage } from './LoginPage/LoginPage'
import { AppPage } from './AppPage/AppPage'

export const router = createBrowserRouter([
  { path: '/', element: <App />, children: [
    { path: 'login', element: <LoginPage /> },
    { path: 'app', element: <AppPage /> },
  ] },
])
