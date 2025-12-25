import React from 'react'
import { useDispatch } from 'react-redux';
import { logout } from '../../features/slice';
function Logoutbtn() {
    const dispatch = useDispatch();
  return (
   <button 
   onClick={()=> dispatch(logout())}
    className="bg-yellow-400">LogOut</button>
  )
}

export default Logoutbtn
