"use client"
import { useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Id({ params }: { params: { id: string } }) {
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = localStorage.getItem('token');
      const username = localStorage.getItem('username');

      try {
        // Make Axios request using the dynamic ID parameter and username
        const response = await axios.post(`http://localhost:8000/voters/vote?candidateId=${params.id}&username=${username}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true
        });

        // Display an alert message upon successful voting
        alert('Voted successfully');

        // Redirect to the homepage
        router.push('/homepage');
      } catch (error) {
        console.error('Error voting:', error);
      }
    };

    fetchData(); // Call fetchData function when component mounts
  }, [params.id, router]); // Run useEffect whenever the ID parameter or router changes

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "linear-gradient(to bottom, rgb(13, 90, 44),rgb(25, 136, 98), white)" }}>
      <div className="max-w-md mx-auto mt-8">
        <div>
          {/* You can add any additional content here */}
        </div>
      </div>
    </div>
  );
}
