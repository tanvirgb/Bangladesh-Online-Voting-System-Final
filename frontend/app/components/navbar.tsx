"use client"
import React, { Key, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

export default function NavBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, jsondata] = useState([]);
  const [showSearchInput, setShowSearchInput] = useState(false);

  const handleLogout = async () => {
    const accessToken = localStorage.getItem('token');
    try {
      // Send logout request using Axios
      await axios.post('http://localhost:8000/voters/logout', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true
      });

      // Log success message
      console.log('Logout successful');

      // Redirect to homepage
      window.location.href = '/'; // Replace '/' with the URL of your homepage if it's different
    } catch (error) {
      // Handle error
      console.error('Logout failed:', error);
    }
  };

  const handleSearch = async () => {
    const accessToken = localStorage.getItem('token');

    try {
      // Make axios request with the search query
      const response = await axios.post(`http://localhost:8000/voters/searchc?Name=${searchQuery}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true
      });
      // Set search results
      const jsondata = response.data;
      console.log(jsondata);
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  return (
    <>
      <div className="navbar bg-gray-800 text-white">
        <div className="navbar-start">
          <div className="dropdown ">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle ">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-black"> {/* Added class text-black */}
              <li><Link href="/homepage/profile">Profile</Link></li>
              <li><button onClick={handleLogout}>Logout</button></li>
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <Link className="btn btn-ghost text-xl" href={'/homepage'}>Bangladesh Online Election Voting</Link>
        </div>
        <div className="navbar-end">
          {/* Search button */}
          
          <button
            onClick={() => setShowSearchInput(true)}
            className="btn btn-ghost btn-circle"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </button>
          {/* Input field and submit button */}
          {showSearchInput && (
            <div className="flex" >
              <input
             
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border border-gray-300 rounded-l py-2 px-4 focus:outline-none focus:ring focus:border-blue-500 text-black"
                placeholder="Type..."
              />
              <button
                onClick={handleSearch}
                className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded-r"
              >
                Search
              </button>
            </div>
          )}
          {/* Search results */}
          {searchResults.length > 0 && (
  <div>
    <h2>Search Results</h2>
    <ul>
      {searchResults.map((item:any, index: Key | null | undefined) => (
        <li key={index}>
          <div text-black>
            <p>Name: {item.name}</p>
            <p>Position: {item.position}</p>
            <p>Location: {item.election_location}</p>
          </div>
        </li>
      ))}
              </ul>
            </div>
          )}
          
        </div>
      </div>
    </>
  );
}
