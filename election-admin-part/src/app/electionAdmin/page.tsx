"use client";
import React, { useState } from "react";
import ElectionAdminLogin from "../_components/electionAdminLogin";
import ElectionAdminRegistration from "../_components/electionAdminRegistration";

const ElectionAdmin = () => {
  const [login, setLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-400 to-indigo-500 flex flex-col justify-center items-center py-8">
      <h1 className="text-4xl font-bold mb-6 text-center text-white">
        Welcome to Election Admin Portal
      </h1>
      <div className="max-w-md w-full bg-white rounded-lg overflow-hidden shadow-md transform hover:scale-105 transition duration-300 ease-in-out">
        <div className="px-6 py-8">
          {login ? <ElectionAdminLogin /> : <ElectionAdminRegistration />}
        </div>
        <div className="text-center py-4">
          <button
            onClick={() => setLogin(!login)}
            className="text-blue-500 hover:underline focus:outline-none"
          >
            {login
              ? "Don't have an account? Register here"
              : "Already have an account? Log in here"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ElectionAdmin;
