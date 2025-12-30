import React from 'react'
import Container from '../container/container'
import { Link} from 'react-router-dom'
import { useSelector } from 'react-redux';
import Logoutbtn from './Logoutbtn';

const Header = () => {
  
  const {isActive, userData} = useSelector((state)=> state.auth);
  const navItems = [
    {
      name : "Home",
      slug: "/",
      active:true
    },{
      name: "Signup",
      slug : '/signup',
      active: !isActive
    },{
      name: "Login",
      slug: "/login",
      active: !isActive
     },{
      name:"Report", 
      slug:"/report",
      active:(isActive && userData?.role === "USER" )
     },{
      name:"Reels",
      slug: "/reels",
      active: isActive
     },{
      name:"Create", // create reels
      slug:"/create",
      active: (isActive && userData?.role === "USER")
     }, {
      name :"Dashboard",
      slug:"/dashboard",
      active : (isActive && userData?.role ==="NGO" )
     },
     {
      name : "Tracking",
      slug :"/tracking",
      active : isActive
     }

  ]
  return (
   <header className='w-full'>
    <Container>
    <nav className = "flex">
      <div>
        <Link to="/">LOGO DALNA HAI YAHA </Link>
      </div>
      <div className = 'flex gap-6 ml-auto'>
        <ul className='flex gap-6 mx-auto hover:cursor-pointer'>
          {navItems.map((item)=>(
            item.active? (
              <li key={item.name} className= {`  hover:text-blue-500 hover:underline transition text-xl no-underline`} >
                <Link to={item.slug}>{item.name}
                </Link>
                </li>
            ): null
          ))}
          {isActive && (
            <li>
              <Logoutbtn/>
            </li>
          )}

        </ul>
      </div>
    </nav>
    </Container>
   </header>
  )
}

export default Header