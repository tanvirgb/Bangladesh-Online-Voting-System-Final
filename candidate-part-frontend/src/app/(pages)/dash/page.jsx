"use client";
import React, { useEffect, useState } from "react";

function Dashboard () {
  const [totalVoters, setTotalVoters] = useState(1234567);
  const [activeElections, setActiveElections] = useState(5);
  const [votesCastToday, setVotesCastToday] = useState(12345);
  const [completedElections, setCompletedElections] = useState(25);
  const [upcomingElections, setUpcomingElections] = useState(3);
  const [totalCandidates, setTotalCandidates] = useState(567);

  useEffect(() => {
    const interval = setInterval(() => {
      setTotalVoters((prev) => prev + Math.floor(Math.random() * 10));
      setActiveElections((prev) => prev + Math.floor(Math.random() * 2));
      setVotesCastToday((prev) => prev + Math.floor(Math.random() * 50));
      setCompletedElections((prev) => prev + Math.floor(Math.random() * 1));
      setUpcomingElections((prev) => prev + Math.floor(Math.random() * 1));
      setTotalCandidates((prev) => prev + Math.floor(Math.random() * 5));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="min-h-screen bg-zinc-500">
    
        <div className="scrolling-text-container bg-slate-100 font-bold">
          <p className="scrolling-text">
            <span className="text-red-600">Top News of Today:</span> A new
            voting center is added in the city.{" "}
            <span className="text-red-600">Announcement:</span> All the Election
            Admins have to provide a Backup Email on or before{" "}
            <span className="text-yellow-600">1st January, 2024</span>.
          </p>
        </div>
        <div className="container mx-auto mt-12 p-6">
          <h1 className="text-5xl font-extrabold mb-12 text-center text-white drop-shadow-lg">
            Welcome, Election Candidate
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-2xl transform transition duration-500 hover:scale-105 hover:bg-gradient-to-r from-green-400 to-blue-500 hover:shadow-xl">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                Total Voters
              </h2>
              <p className="text-4xl font-bold text-blue-600">{totalVoters}</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-2xl transform transition duration-500 hover:scale-105 hover:bg-gradient-to-r from-green-400 to-blue-500 hover:shadow-xl">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                Active Elections
              </h2>
              <p className="text-4xl font-bold text-blue-600">
                {activeElections}
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-2xl transform transition duration-500 hover:scale-105 hover:bg-gradient-to-r from-green-400 to-blue-500 hover:shadow-xl">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                Votes Cast Today
              </h2>
              <p className="text-4xl font-bold text-blue-600">
                {votesCastToday}
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-2xl transform transition duration-500 hover:scale-105 hover:bg-gradient-to-r from-green-400 to-blue-500 hover:shadow-xl">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                Completed Elections
              </h2>
              <p className="text-4xl font-bold text-blue-600">
                {completedElections}
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-2xl transform transition duration-500 hover:scale-105 hover:bg-gradient-to-r from-green-400 to-blue-500 hover:shadow-xl">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                Upcoming Elections
              </h2>
              <p className="text-4xl font-bold text-blue-600">
                {upcomingElections}
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-2xl transform transition duration-500 hover:scale-105 hover:bg-gradient-to-r from-green-400 to-blue-500 hover:shadow-xl">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                Total Candidates
              </h2>
              <p className="text-4xl font-bold text-blue-600">
                {totalCandidates}
              </p>
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
};

export default Dashboard;