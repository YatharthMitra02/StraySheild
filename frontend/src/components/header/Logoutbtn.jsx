import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/slice.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Logoutbtn() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleLogout = async () => {
        setLoading(true);
        try {
            
            await axios.post(
                '/api/auth/logout',
                {},
                { withCredentials: true }
            );
        } catch (err) {
            
            console.error('Logout error:', err);
        } finally {
            
            dispatch(logout());
            // Step 3: redirect to home
            navigate('/');
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleLogout}
            disabled={loading}
            className="hover:text-red-500 transition font-medium disabled:opacity-50"
        >
            {loading ? 'Logging out...' : 'Logout'}
        </button>
    );
}

export default Logoutbtn;