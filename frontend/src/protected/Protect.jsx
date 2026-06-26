import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Protect({children , authentication = true}) {
    const [loader, setLoader] = useState(true);
    const navigate = useNavigate();
    const authStatus = useSelector((state)=> state.auth.isActive)
    useEffect(()=>{
        if(authentication && !authStatus){
            navigate("/")
        }
        else if(!authentication && authStatus ){
            navigate("/")
        }
        setLoader(false)
    } , [authStatus , navigate , authentication]) 

  return loader? <>Loading.....</>: <>{children}</>
}

export default Protect
