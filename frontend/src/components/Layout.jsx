import React from 'react'
import {Outlet} from 'react-router-dom';
import Header from './header/Header';
import Footer from './Footer';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';
import { login } from '../features/slice.js';  

function Layout() {
   const dispatch = useDispatch();

    useEffect(() => {
        // runs once when app loads
        // checks if user has a valid cookie and restores their session
        const restoreSession = async () => {
            try {
                const response = await axios.get(
                    '/api/auth/me',
                    { withCredentials: true }
                );
                // cookie was valid — restore user in Redux
                dispatch(login(response.data.user));
            } catch (err) {
                // no valid cookie — user stays logged out
                // this is normal — don't show any error
            }
        };

        restoreSession();
    }, []);
  return (
    <>
     <Header/>
     <main>
     <Outlet/>
    </main>
    <Footer/> 
    </>
   
  )
}

export default Layout
