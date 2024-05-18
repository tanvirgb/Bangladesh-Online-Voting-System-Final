"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserCard2 from '@/app/components/usercard2';

export default function ViewAllParties() {
  const [parties, setParties] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
    const accessToken = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:8000/voters/viewallp', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true
          });
        setParties(response.data);
      } catch (error) {
        console.error('Error fetching parties:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "linear-gradient(to bottom, rgb(13, 90, 44),rgb(25, 136, 98), white)" }}>
      <div className="max-w-md mx-auto mt-8">
        <h1 className="text-2xl font-bold mb-4">Political Parties</h1>
        <div>
          {parties.map((party, index) => (
            <div key={index}>
              <UserCard2 data={party} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
