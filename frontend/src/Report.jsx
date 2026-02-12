import React from 'react'
import { useState } from "react";

const REPORT = () => {
  
    const [formData, setFormData] = useState({
    description: "",
    address: "",
    caseType: "",
    severity: "",
    contactNumber: "",
    images: null
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

 const handleFileChange = (e)=>{ // for files uploaded in the input form 
  setFormData({...formData,
    images : e.target.files
 })

 };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-6">

      <form 
        onSubmit={handleSubmit}
        className="bg-yellow-200 p-8 rounded-2xl shadow-xl w-full max-w-2xl space-y-5"
      >
        <img className='h-10 w-10 mx-auto' src="https://cdn-icons-png.freepik.com/512/9848/9848829.png" alt="" />
        <h2 className="text-2xl font-bold text-center">
          Report Stray Dog Case
        </h2>

        {/* Case Type */}
        <div>
          <label className="block mb-1 font-medium">Case Type</label>
          <select
            name="caseType"
            onChange={handleChange}
            required
            className="w-full border p-2 rounded-lg"
          >
            <option value="">Select Case Type</option>
            <option value="Injured">Injured</option>
            <option value="Sick">Sick</option>
            <option value="Aggressive">Aggressive</option>
            <option value="Abandoned">Abandoned</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Severity */}
        <div>
          <label className="block mb-1 font-medium">Severity</label>
          <select
            name="severity"
            onChange={handleChange}
            required
            className="w-full border p-2 rounded-lg"
          >
            <option value="">Select Severity</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Emergency">Emergency</option>
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            rows="4"
            onChange={handleChange}
            required
            className="w-full border p-2 rounded-lg"
          />
        </div>

        {/* Address */}
        <div>
          <label className="block mb-1 font-medium">Address / Location</label>
          <input
          placeholder='Malviya Nagar,opp. EHCC Hospital'
            type="text"
            name="address"
            onChange={handleChange}
            required
            className="w-full border p-2 rounded-lg"
          />
        </div>

        {/* Contact */}
        <div>
          <label className="block mb-1 font-medium">Your Contact Number</label>
          <input
            type="text"
            name="contactNumber"
            onChange={handleChange}
            required
            className="w-full border p-2 rounded-lg"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block mb-1 font-medium">Upload Image</label>
          <input
            type="file"
            onChange={handleFileChange}
            required
            className="w-full"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition"
        >
          Submit Report
        </button>

      </form>
      </div>
 

  )
}

export default REPORT