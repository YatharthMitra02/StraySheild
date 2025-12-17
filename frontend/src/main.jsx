import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './components/Home.jsx'
import REPORT from './REPORT.JSX'
import Reels from './components/Reels.jsx'



const router = createBrowserRouter([
    {
      path:"/",
      element: <Layout/>,
      children:[
        {
          path:"",
          element:<Home/>
          
        },
        {
          path:"/report",
          element:<REPORT/>
        },
        {
          path: "/reels",
          element :<Reels/>
        }
      ]
    }
  ])
  

createRoot(document.getElementById('root')).render(

  <StrictMode>
   <RouterProvider router={router} />
  </StrictMode>,
)
