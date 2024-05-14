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
        <Link href="/electionAdmin">
          <button className="bg-white text-blue-700 font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 hover:bg-blue-700 hover:text-white">
            Get Started
          </button>
        </Link>
      </div>
    </main>
  );
}
