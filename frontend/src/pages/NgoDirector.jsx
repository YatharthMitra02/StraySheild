import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useState,useEffect } from 'react'

const NgoDirectory = () => {
    const [error,setError] = useState('');
    const[loading, setLoading ] = useState(true);
    const [ngos, setNgos] = useState([]);
    const navigate = useNavigate()
    useEffect(() => {
    const getNgoInfo = async ()=>{
    try {
        const response = await axios.get('/api/ngo');
        setNgos(response.data);
        
        
    } catch (error) {
        setError(error?.response?.data?.message || "Something went wrong please try again")
        
    }
    finally{
        setLoading(false);

    }
    }
    getNgoInfo();
      
    }, [])
    if(loading)return(
        <div className='flex justify-center item-center min-h-screen'>
            <p className='text-gray-500'>Loading Ngo's.....</p>
        </div>
    );
    if(error)return(
        <div className='flex justify-center items-center min-h-screen'>
            <p className='text-red-600'>{error}</p>
        </div>
    );
    
  return (
        <div className="min-h-screen bg-gray-50 p-6">
            <h1 className="text-3xl font-bold text-center mb-2">
                🐾 Registered NGOs
            </h1>
            <p className="text-center text-gray-500 mb-8">
                Organisations working to protect stray animals in Jaipur
            </p>

            {ngos.length === 0 ? (
                <p className="text-center text-gray-400">No NGOs registered yet.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {ngos.map((ngo) => (
                        <div key={ngo._id}
                            className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition">
                            <h2 className="text-xl font-bold text-orange-500 mb-1">
                                {ngo.organisationName}
                            </h2>
                            <p className="text-gray-500 text-sm mb-4">
                                Est. {new Date(ngo.establishedIn).getFullYear()}
                            </p>
                            <div className="space-y-2 text-sm">
                                <p>📍 {ngo.address}</p>
                                <p>👤 {ngo.directorName}</p>
                                <p>📞 {ngo.contactNo}</p>
                                <p>🌍 {ngo.serviceIn}</p>
                                <p>👥 {ngo.membersCount} members</p>
                            </div>
                            <div className="mt-4 pt-4 border-t border-gray-100">
                                <a href={`mailto:${ngo.email}`}
                                    className="text-orange-500 hover:underline text-sm font-medium">
                                    ✉️ {ngo.email}
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default NgoDirectory;