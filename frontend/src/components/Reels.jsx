import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Reels = () => {
    const [reels, setReels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // upload form state
    const [caption, setCaption] = useState('');
    const [videoFile, setVideoFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState('');

    // get logged in user from Redux
    const { isActive, userData } = useSelector((state) => state.auth);
    const isNGO = isActive && userData?.role === 'NGO';

    // fetch all reels on load
    useEffect(() => {
        const fetchReels = async () => {
            try {
                const res = await axios.get('/api/reels');
                setReels(res.data);
            } catch (err) {
                setError('Failed to load reels.');
            } finally {
                setLoading(false);
            }
        };
        fetchReels();
    }, []);

    // handle video upload to Cloudinary then save to backend
    const handleUpload = async (e) => {
        e.preventDefault();
        if (!videoFile) return setUploadError('Please select a video.');
        setUploading(true);
        setUploadError('');

        try {
            // Step 1: upload video directly to Cloudinary
            const cloudinaryData = new FormData();
            cloudinaryData.append('file', videoFile);
            cloudinaryData.append('upload_preset', 'pcd3r2zw');
            cloudinaryData.append('cloud_name', 'streamit');

            const cloudRes = await axios.post(
                'https://api.cloudinary.com/v1_1/streamit/video/upload',
                cloudinaryData
            );

            const reelURL = cloudRes.data.secure_url;

            // Step 2: save URL + caption to your backend
            const res = await axios.post(
                '/api/reels',
                { reelURL, caption },
                { withCredentials: true }
            );

            // add new reel to top of feed
            setReels([res.data.reel, ...reels]);
            setCaption('');
            setVideoFile(null);

        } catch (err) {
            setUploadError('Upload failed. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    if (loading) return (
        <div className="flex justify-center items-center min-h-screen">
            <p className="text-gray-500">Loading reels...</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">

            {/* page header */}
            <div className="p-6 text-center border-b bg-white">
                <h1 className="text-3xl font-bold">🐾 Rescue Reels</h1>
                <p className="text-gray-500 mt-1">
                    Real rescue stories from NGOs across Jaipur
                </p>
            </div>

            {/* NGO upload form — only visible to NGO role */}
            {isNGO && (
                <div className="max-w-xl mx-auto mt-6 bg-white rounded-2xl shadow p-6">
                    <h2 className="text-xl font-semibold mb-4">Upload Rescue Reel</h2>

                    {uploadError && (
                        <p className="text-red-500 text-sm mb-3">{uploadError}</p>
                    )}

                    <form onSubmit={handleUpload} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Select Video
                            </label>
                            <input
                                type="file"
                                accept="video/*"
                                onChange={(e) => setVideoFile(e.target.files[0])}
                                className="w-full"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Caption
                            </label>
                            <input
                                type="text"
                                value={caption}
                                onChange={(e) => setCaption(e.target.value)}
                                placeholder="Describe this rescue..."
                                className="w-full border rounded-lg p-2"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={uploading}
                            className="w-full bg-orange-500 text-white py-2 rounded-xl font-semibold hover:bg-orange-600 transition disabled:opacity-50"
                        >
                            {uploading ? 'Uploading...' : 'Upload Reel'}
                        </button>
                    </form>
                </div>
            )}

            {/* error */}
            {error && (
                <p className="text-center text-red-500 mt-6">{error}</p>
            )}

            {/* reels feed */}
            <div className="max-w-xl mx-auto mt-6 space-y-6 pb-10">
                {reels.length === 0 ? (
                    <p className="text-center text-gray-400">
                        No reels yet. NGOs can upload rescue videos above.
                    </p>
                ) : (
                    reels.map((reel) => (
                        <div
                            key={reel._id}
                            className="bg-white rounded-2xl shadow overflow-hidden"
                        >
                            <video
                                src={reel.reelURL}
                                controls
                                className="w-full max-h-[500px] object-cover"
                            />
                            <div className="p-4">
                                <p className="font-medium">{reel.caption}</p>
                                <p className="text-gray-400 text-sm mt-1">
                                    By {reel.uploadedBy?.fullName || 'NGO'}
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Reels;