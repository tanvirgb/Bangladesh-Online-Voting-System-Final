"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { UserCardProfile } from "../../utilities/usecard";

interface User {
    username: string,
    name: string,
    address: string,
    contact: string,
    email: string,
    nid: number,
    gender: string,
    religion: string,
    image: string
}

export default function ViewProfile() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const username = localStorage.getItem('username');
                const token = localStorage.getItem('token');

                const response = await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/sys_admin/view_profile`, {
                    username: username
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true
                });

                setUser(response.data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchUserData();
    }, []);

    return (
        <div>
            <br />
            <h1 className="text-4xl font-bold text-red-900 pl-4">My Profile</h1>
            <div className='flex item-center justify-center'>
                {user &&
                    <div className='carousel carousel-center max-w-md p-4 space-x-4 rounded-box'>
                        <UserCardProfile data={user} />
                    </div>}
            </div>
        </div>
    );
}