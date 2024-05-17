import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <main className="bg-gradient-to-b from-blue-800 to-blue-600 min-h-screen flex justify-center items-center">
      <div className="text-white text-center">
        <h1 className="text-6xl font-extrabold mb-6">
          Bangladesh Online Voting System
        </h1>
        <p className="text-3xl mb-10 text-gray-200 typing-animation">
          An online voting platform
        </p>
        <p className="text-2xl mb-5 text-gray-200">Get started as</p>
        <div className="space-y-4">
          <Link href="http://localhost:3000/electionAdmin">
            <button className="bg-white text-blue-700 font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 hover:bg-blue-700 hover:text-white w-full sm:w-44">
              Election Admin
            </button>{" "}
          </Link>
          <Link href="http://localhost:3001/">
            <button className="bg-white text-blue-700 font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 hover:bg-blue-700 hover:text-white w-full sm:w-44">
              Voter
            </button>{" "}
          </Link>
          <Link href="/electionAdmin">
            <button className="bg-white text-blue-700 font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 hover:bg-blue-700 hover:text-white w-full sm:w-44">
              Candidate
            </button>{" "}
          </Link>
          <Link href="http://localhost:3003/">
            <button className="bg-white text-blue-700 font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 hover:bg-blue-700 hover:text-white w-full sm:w-44">
              System Admin
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
