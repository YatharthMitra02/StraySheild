import React from 'react'
import { useState } from 'react';

const NgoForm = () => {
  const [formData, setFormData] = useState({
    organisationName: "",
    establishedIn: "",
    address: "",
    email: "",
    directorName: "",
    contactNo: "",
    serviceIn: "",
    membersCount:""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Send to backend using axios/fetch
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      
      <form 
        onSubmit={handleSubmit}
        className="bg-yellow-200 shadow-xl rounded-2xl p-8 w-full max-w-2xl space-y-5"
      >
        <img className='mx-auto w-10 h-10' src="https://cdn-icons-png.freepik.com/512/9848/9848829.png" alt="" />
        <h2 className="text-2xl font-bold text-center">
          Create NGO
        </h2>

        {/* Organisation Name */}
        <div>
          <label className="block mb-1 font-medium">Organisation Name</label>
          <input
            type="text"
            name="organisationName"
            value={formData.organisationName}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Established In */}
        <div>
          <label className="block mb-1 font-medium">Established In</label>
          <input
            type="date"
            name="establishedIn"
            value={formData.establishedIn}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Address */}
        <div>
          <label className="block mb-1 font-medium">Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            rows="3"
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 font-medium">Official Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Director Name */}
        <div>
          <label className="block mb-1 font-medium">Director Name</label>
          <input
            type="text"
            name="directorName"
            value={formData.directorName}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Contact Number */}
        <div>
          <label className="block mb-1 font-medium">Contact Number</label>
          <input
            type="number"
            name="contactNo"
            value={formData.contactNo}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Service In */}
        <div>
          <label className="block mb-1 font-medium">Service Area </label>
          <textarea
            name="serviceIn"
            value={formData.serviceIn}
            onChange={handleChange}
            required
            rows="3"
            placeholder="Example: Malviya nagar,jaipur..."
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Total no. of Members</label>
          <input
            type="number"
            name="contactNo"
            value={formData.membersCount}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-green-700 transition duration-300"
        >
          Create NGO
        </button>

      </form>
    </div>
  );
}

export default NgoForm;