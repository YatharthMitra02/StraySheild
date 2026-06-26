import Protect from './protected/Protect.jsx';
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
import MapPage from './pages/MapPage.jsx'
import NgoDirectory from './pages/NgoDirector.jsx'



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
          element:<Protect authentication = {fasle}><Login/></Protect>,
        },
         
        {
          path: "/signup",
          element :<Protect authentication={false}><Signup/></Protect>
        },
        {
          path: "/ngoform",
          element:<Protect><NgoForm/></Protect>

        },
        {
          path:"/report",
          element:<Protect><REPORT/></Protect>
        },
        {
          path: "/reels",
          element :<Reels/>
        },
        {
          path:"/ngos",
          element: <NgoDirectory/>

        },
        {
          path:"/map",
          element: <MapPage/>
        }
      ]
    }
  ])
  

createRoot(document.getElementById('root')).render(

  <Provider store = {store}>
   <RouterProvider router={router} />
  </Provider>,
)
