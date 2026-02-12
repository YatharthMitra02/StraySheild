import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './components/Home.jsx'
import REPORT from './REPORT.JSX'
import Reels from './components/Reels.jsx'
import { store } from './store/store.js'
import {Provider} from 'react-redux'
import Login from './components/Login.jsx'
import Signup from './pages/Signup.jsx'
import NgoForm from './pages/NgoForm.jsx'



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
          path:"/login",
          element:<Login/>,
        },
         
        {
          path: "/signup",
          element :<Signup/>
        },
        {
          path: "/ngoform",
          element:<NgoForm/>

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

  <Provider store = {store}>
   <RouterProvider router={router} />
  </Provider>,
)
