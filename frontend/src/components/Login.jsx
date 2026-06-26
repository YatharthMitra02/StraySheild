import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '../features/slice.js';

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // form state
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    // error and loading state
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // handle input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await axios.post(
                '/api/auth/login',
                formData,
                { withCredentials: true }  // allows cookie to be received
            );

            // store user in Redux — same as Signup
            dispatch(login(response.data.user));

            // everyone goes to home after login
            // header will show correct nav items based on role automatically
            navigate('/');

        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='min-h-screen flex items-center justify-center'>
            <div className='shadow-2xl p-8 rounded-2xl border border-orange-300 bg-yellow-200 flex flex-col items-center w-full max-w-md'>

                <img
                    className='h-10 w-10'
                    src="https://cdn-icons-png.freepik.com/512/9848/9848829.png"
                    alt="StrayShield"
                />

                <div className='mt-2 mb-6 text-center'>
                    <h2 className='font-bold text-2xl'>StrayShield</h2>
                    <p className='text-gray-500 text-sm'>Join us in protecting street dogs</p>
                </div>

                {/* error message */}
                {error && (
                    <div className='w-full mb-4 p-3 bg-red-100 text-red-600 rounded-xl text-sm'>
                        {error}
                    </div>
                )}

                {/* form */}
                <form onSubmit={handleSubmit} className='w-full space-y-4'>
                    <div>
                        <label className='block text-sm font-medium mb-1'>Email</label>
                        <input
                            className='w-full p-3 border border-gray-300 rounded-xl'
                            type="email"
                            name="email"
                            placeholder='example@gmail.com'
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label className='block text-sm font-medium mb-1'>Password</label>
                        <input
                            className='w-full p-3 border border-gray-300 rounded-xl'
                            type="password"
                            name="password"
                            placeholder='Enter your password'
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className='w-full bg-orange-400 text-white p-3 rounded-xl font-semibold hover:bg-orange-500 transition disabled:opacity-50'
                    >
                        {loading ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>

                <div className="mt-4 text-sm text-center">
                    <span className="text-gray-600">Don't have an account? </span>
                    <Link
                        to="/signup"
                        className="text-orange-500 font-semibold hover:underline"
                    >
                        Create an account
                    </Link>
                </div>

            </div>
        </div>
    );
}

export default Login;