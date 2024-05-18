"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Id({ params }: { params: { name: string } }) {
  const [postData, setPostData] = useState<any>(null); // State to store fetched data

  useEffect(() => {
   

    fetchData(); // Call fetchData function when component mounts
  }, [params.name]); // Run useEffect whenever the name parameter changes
  const fetchData = async () => {
    const accessToken = localStorage.getItem('token');

    try {
      // Make Axios request using the dynamic name parameter
      const response = await axios.post(`http://localhost:8000/voters/searchc?Name=${params.name}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true
      });
      setPostData(response.data); // Store fetched data in state
      console.log(response.data);
      console.log(postData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "linear-gradient(to bottom, rgb(13, 90, 44),rgb(25, 136, 98), white)" }}>
      <div className="max-w-md mx-auto mt-8">
        <h1 className="text-2xl font-bold mb-4">Candidate</h1>
        <div>
          {postData ? (
            // Display fetched data if available
            <div>
              Name: {postData.name} {/* Adjust property name as per your API response */}
              <pre>{JSON.stringify(postData, null, 2)}</pre> {/* Print JSON data */}

            </div>
          ) : (
            // Display loading message while data is being fetched
            <div>Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
}
