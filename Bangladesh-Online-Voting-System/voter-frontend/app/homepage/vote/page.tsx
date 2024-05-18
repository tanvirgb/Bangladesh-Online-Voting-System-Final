"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import UserCard4 from '@/app/components/usercard4';

export default function Vote() {
    const router = useRouter();
    const [candidates, setCandidates] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const accessToken = localStorage.getItem('token');

            try {
                const response = await axios.get('http://localhost:8000/voters/viewallc', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                    withCredentials: true
                });
                setCandidates(response.data);
            } catch (error) {
                console.error('Error fetching candidates:', error);
            }
        };
        fetchData();
    }, []);

    const handleVoteClick = async () => {
        const username = localStorage.getItem('username');
        const accessToken = localStorage.getItem('token');

        try {
            // Make axios request to backend page
            const response = await axios.post('http://localhost:8000/voters/vote', {
                username: username
            }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                withCredentials: true
            });
            // Handle the response if needed

            // Redirect to the page for voting
            router.push('/homepage');
        } catch (error) {
            console.error('Error voting:', error);
            // Handle error if needed
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center" style={{ background: "linear-gradient(to bottom, rgb(13, 90, 44),rgb(25, 136, 98), white)" }}>
            <div className="max-w-md mx-auto mt-8">
                <h1 className="text-2xl font-bold mb-4">Registered Candidates</h1>
                <div>
                    {candidates.map((item, index) => (
                        <div onClick={handleVoteClick} key={index}>
                            <UserCard4 data={item} /><br />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
