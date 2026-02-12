import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Input from './Input'

function Login() {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      {/* main login card container */}
      <div className='shadow-2xl p-5 rounded-2xl border border-orange-300  bg-yellow-200 flex flex-col items-center justify-center h-[60%] w-full max-w-md'>
        <img className='h-10 w-10' src="https://cdn-icons-png.freepik.com/512/9848/9848829.png" alt="" />
        <div className='m-2'>
          <h2 className='font-bold text-2xl text-center'>StrayShield</h2>
          <p className='text-gray-500 font-sm'>Join us in protecting street dogs</p>
          
        </div>
        <div className='flex gap-5 m-4'>
          <button className='font-semibold text-lg p-3 rounded-xl bg-gray-400  hover:bg-gray-500 transition '>SignIn as Citizen </button>
          <button className='font-semibold text-lg p-3 rounded-xl bg-gray-400  hover:bg-gray-500 transition '>SignIn as NGO</button>
        </div>
        <div className='m-2 p-4'>
          <div>
            <label className='text-center'> Email: </label>
          <input className='m-2 p-4 border-black rounded-2xl w-full 
' type="text"
          placeholder='example@gmail.com' />
          </div>
          <div className='m-1'>
            <label>Password: </label>
          <input className='m-2 p-4 border-black rounded-2xl w-full 
' type="password"
          placeholder='enter your password' />
          </div>
          <button className=' m-3 w-full bg-orange-400 p-4 rounded-xl '>Sign In</button>
          <div className="mt-4 text-sm text-center">
  <span className="text-gray-600">Don't have an account? </span>
  <Link 
    to="/signup" 
    className="text-orange-500 font-semibold hover:underline hover:text-orange-600 transition"
  >
    Create an account
  </Link>
</div>

        </div>
      </div>
    </div>
  )
}

export default Login
