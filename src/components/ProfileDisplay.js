import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfileDisplay = () => {
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const fetchUserProfile = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            if (accessToken) {
                const response = await axios.get('https://api.github.com/user', {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                    },
                });

                if (response.status === 200) {
                    const { login, avatar_url, name } = response.data;
                    setUserProfile({ login, avatar_url, name });
                }
            }

            setLoading(false);
        } catch (error) {
            console.error('Error fetching user profile:', error);
            setLoading(false);
        }
    };

    return (
        <div >
            {userProfile && (
                <>
                    <img
                        src={userProfile.avatar_url}
                        alt="User Avatar"
                        id='profilepic'
                    />
                    <p id='profilename'>
                        {userProfile.name || userProfile.login}
                    </p>
                </>
            )}
            {loading && <p >Loading...</p>}
            {!userProfile && !loading && <p>No profile found</p>}
        </div>
    );
};

export default ProfileDisplay;
