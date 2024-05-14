"use client";
import { useState } from "react";
import Navbar from "../_components/Navbar";
import Footer from "../_components/Footer";
import axios from "axios";

export default function ReportIssue() {
  const [issue, setIssue] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: any) => {
    const data = {
      issue: issue,
      email: email,
    };

    const response = await axios.post(
      "http://localhost:3000/api/reportIssue",
      data
    );

    if (response.data) {
      setSubmitted(true);
      setIssue("");
      setEmail("");
    } else {
      console.error("Failed to submit issue");
    }
  };

  if (submitted) {
    return (
      <p className="text-center text-green-600">
        Thank you for your report. We'll look into it shortly.
      </p>
    );
  }

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-gray-500">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">
            Report an Issue
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="issue"
                className="block text-gray-700 font-bold mb-2"
              >
                Describe the issue:
              </label>
              <textarea
                id="issue"
                value={issue}
                onChange={(e) => setIssue(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-bold mb-2"
              >
                Your email (optional):
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200">
              Submit
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
