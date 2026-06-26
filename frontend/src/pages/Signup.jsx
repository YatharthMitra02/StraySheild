import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '../features/slice';

const Signup = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // form data state
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        phoneNo: '',
        address: '',
        role: 'User'    
    });

    
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    
    const handleRoleSelect = (selectedRole) => {
        setFormData({
            ...formData,
            role: selectedRole
        });
    };

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await axios.post(
                '/api/auth/register',
                formData,
                { withCredentials: true }  // to send and recieve the tokens form backend 
            );

            
            dispatch(login(response.data.user));

            // redirect based on role
            if (response.data.user.role === 'NGO') {
                navigate('/ngoform');   // NGO fills org details next
            } else {
                navigate('/');          // regular user goes home
            }

        } catch (err) {
            
            setError(err.response?.data?.message || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">

                <img 
                    className='h-10 w-10 mx-auto mb-2' 
                    src="https://cdn-icons-png.freepik.com/512/9848/9848829.png" 
                    alt="StrayShield" 
                />
                <h2 className="text-2xl font-bold text-center mb-2">Create Account</h2>
                <p className="text-gray-500 text-center mb-6">
                    Join StrayShield and help protect street dogs
                </p>

                {/* Role Selection */}
                <div className="flex gap-3 mb-6">
                    <button
                        type="button"
                        onClick={() => handleRoleSelect('User')}
                        className={`flex-1 py-2 rounded-xl font-medium transition ${
                            formData.role === 'User'
                                ? 'bg-orange-500 text-white'
                                : 'bg-gray-200 text-gray-700'
                        }`}
                    >
                        Citizen
                    </button>
                    <button
                        type="button"
                        onClick={() => handleRoleSelect('NGO')}
                        className={`flex-1 py-2 rounded-xl font-medium transition ${
                            formData.role === 'NGO'
                                ? 'bg-orange-500 text-white'
                                : 'bg-gray-200 text-gray-700'
                        }`}
                    >
                        NGO
                    </button>
                </div>

                
                {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-600 rounded-xl text-sm">
                        {error}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        className="w-full p-3 border rounded-xl"
                        placeholder="Full Name"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                    />
                    <input
                        className="w-full p-3 border rounded-xl"
                        placeholder="Email Address"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        className="w-full p-3 border rounded-xl"
                        placeholder="Password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <input
                        className="w-full p-3 border rounded-xl"
                        placeholder="Phone Number"
                        name="phoneNo"
                        value={formData.phoneNo}
                        onChange={handleChange}
                        required
                    />
                    <input
                        className="w-full p-3 border rounded-xl"
                        placeholder="Address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-2 bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition disabled:opacity-50"
                    >
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-500 mt-4">
                    Already have an account?{' '}
                    <Link to="/login" className="text-orange-500 font-semibold hover:underline">
                        Sign In
                    </Link>
                </p>

            </div>
        </div>
    );
};

export default Signup;