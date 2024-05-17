"use client"

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function UserPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/user/5`,
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1kYWxpZkBnbWFpbC5jb20iLCJzdWIiOnsibmFtZSI6Ik1kIEFsaWYifSwiaWF0IjoxNzE1ODQ2OTA1LCJleHAiOjE3MTU4NTA1MDV9.HU8tUoHPOOV5t_2SLjGXl5rXkRqFSicqoBh77AgtcnQ`,
              "Content-Type": "application/json",
            },
          }
        );
        setUser(response.data);
        console.log(setUser);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);




  return (
    <div className="flex items-center justify-center min-h-screen min-w-full bg-orange-300">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md max-h-md mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">User Information</h1>
        <div className="space-y-4">
          <div className="flex items-center">
            <span className="text-gray-700 font-semibold w-24">ID:</span>
            <span className="text-gray-900">{user ? user.id : 'N/A'}</span>
          </div>
          <div className="flex items-center">
            <span className="text-gray-700 font-semibold w-24">Name:</span>
            <span className="text-gray-900">{user ? user.name : 'N/A'}</span>
          </div>
          <div className="flex items-center">
            <span className="text-gray-700 font-semibold w-24">Email:</span>
            <span className="text-gray-900">{user ? user.email : 'N/A'}</span>
          </div>
        </div>
      </div>
    </div>
  );











  // return (<div className="flex items-center justify-center min-h-full min-w-full bg-cyan-500">
  //   <h1>User Information</h1>
  //   <div>{user ? <p>{user.id}</p> : <p></p>}<br/></div>
  //   <div>{user ? <p>{user.name}</p> : <p></p>}<br/></div>
  //   <div>{user ? <p>{user.email}</p> : <p></p>}</div>
   
  //   </div>
    
  // );
}
