"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserCard from '../../components/usercard';

export default function ViewAllCandidates() {
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

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "linear-gradient(to bottom, rgb(13, 90, 44),rgb(25, 136, 98), white)" }}>
      <div className="max-w-md mx-auto mt-8">
        <h1 className="text-2xl font-bold mb-4 text-white">Registered Candidates</h1>
        <div>
          {candidates.map((candidate, index) => (
            <div key={index}>
              <UserCard data={candidate} />
              <br/><br/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
