"use client";
import React, { useState } from "react";
import ElectionAdminLogin from "../_components/ElectionAdminLogin";
import ElectionAdminRegistration from "../_components/ElectionAdminRegistration";
import Typewriter from "typewriter-effect";
import Footer from "../_components/Footer";
import Header from "../_components/Header";

const ElectionAdmin = () => {
  const [login, setLogin] = useState(true);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-green-700 via-green-600 to-green-500 flex flex-col justify-center items-center py-8">
        <h1 className="text-4xl font-bold mb-6 text-center text-white">
          <Typewriter
            options={{
              strings: [
                "Welcome to Election Admin Portal",
                "Login or Register",
              ],
              autoStart: true,
              loop: true,
              delay: 35,
            }}
          />
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
      <Footer />
    </>
  );
};

export default ElectionAdmin;
