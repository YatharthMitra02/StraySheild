import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Signup = () => {
    const Navigate = useNavigate()
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
  <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">

    <h2 className="text-2xl font-bold text-center mb-2">Create Account</h2>
    <p className="text-gray-500 text-center mb-6">
      Join StrayShield and help protect street dogs
    </p>

    {/* Role Toggle */}
    <div className="flex gap-3 mb-6">
      <button className="flex-1 py-2 rounded-xl hover: bg-orange-500 text-white font-medium">
        Citizen
      </button>
      <button 
      onClick={()=>(
        Navigate("/ngoform")
      )}
       className="flex-1 py-2 rounded-xl hover:bg-orange-500 bg-gray-200 font-medium">
        NGO
      </button>
    </div>

    {/* Example Fields */}
    <div className="space-y-4">
      <input className="w-full p-3 border rounded-xl"
        placeholder="Full Name" />
      <input className="w-full p-3 border rounded-xl"
        placeholder="Email Address" />
      <input className="w-full p-3 border rounded-xl"
        type="password"
        placeholder="Password" />
    </div>

    <button className="w-full mt-6 bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition">
      Create Account
    </button>

    <p className="text-center text-sm text-gray-500 mt-4">
      Already have an account?
      <Link to="/login" className="text-orange-500 cursor-pointer hover:underline">
        Sign In
      </Link>
    </p>

  </div>
</div>

  )
}

export default Signup
