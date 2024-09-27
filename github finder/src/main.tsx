import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { createBrowserRouter,RouterProvider } from 'react-router-dom'

//pages
import Home from './routes/Home'
const router = createBrowserRouter([
  {
    path:"/",
    element: <App/>,
    children:[
      {
        path:'/',
        element:<Home/>,
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <RouterProvider router={router} />
  </StrictMode>,
)
