"use client"
import React, { Key } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default async function Home() {
  const router = useRouter();

  const response = await axios.get('http://localhost:8000/voters/votingpoll');
    const jsondata = response.data;
    const res = await axios.get('http://localhost:8000/voters/prediction');
    const data = res.data;
           
        
  const handleCandidatesClick = () => {
    // Redirect to the page for registered candidates
    router.push('/homepage/viewallc');
  };

  const handlePartiesClick = () => {
    // Redirect to the page for political parties
    router.push('/homepage/viewallp');
  };
  const handleVoteClick = () => {
    // Redirect to the page for registered candidates
    router.push('/homepage/vote');
  };
  const allData = [...jsondata, ...data];
  return (
    <div className="flex flex-col h-screen" style={{ background: "linear-gradient(to bottom, rgb(13, 90, 44), rgb(25, 136, 98), white)" }}>
      <div className="flex-grow flex items-center justify-center">
        {allData.map((item: any, index: Key) => (
          item.vote_count && item.prediction && item.username && item.location && (
            <div key={index} className="card w-96 text-black m-4" style={{ background: "linear-gradient(to bottom, lightgrey, white)" }}>
              <div className="card-body">
                <div className="stat">
                  <p className="stat-title">Vote Count:</p>
                  <p className="stat-value">{item.vote_count}</p>
                  <p className="stat-title">Prediction: </p>
                  <p className="stat-value">{item.prediction}</p>
                  <p>Candidate Name: {item.username}</p>
                  <p>Location: {item.location}</p>
                </div>
              </div>
            </div>
          )
        ))}
      </div>
      <div className="flex flex-col items-center mt-20">
  <button
    onClick={handleCandidatesClick}
    className="btn btn-wide bg-blue-800 hover:bg-blue-700 text-white font-bold  rounded mb-8"
  >
    Registered Candidates
  </button>
  <button
    onClick={handlePartiesClick}
    className="btn btn-wide bg-blue-800 hover:bg-blue-700 text-white font-bold  rounded mb-8"
  >
    Political Parties
  </button>
  <button
    onClick={handleVoteClick}
    className="btn btn-wide bg-blue-800 hover:bg-blue-700 text-white font-bold  rounded mb-20"
  >
    Vote Now
  </button>
</div>
    </div>
  );  
  
}  