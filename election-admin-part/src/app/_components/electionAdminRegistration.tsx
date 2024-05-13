import React, { FormEvent, useState } from "react";

const ElectionAdminRegistration = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [number, setNumber] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Perform form validation here
    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword ||
      !address ||
      !number
    ) {
      setError("All fields are required");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    // If all validations pass, submit the form
    console.log("Form submitted successfully");
    setError("");
  };

  return (
    <>
      <h3 className="text-3xl font-bold mb-6 text-center">Registration</h3>
      <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-md">
        <form className="px-8 py-6" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="fullName"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter your full name"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter your password"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Confirm your password"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="address"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Address
            </label>
            <input
              id="address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter your address"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="mobileNumber"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Mobile Number
            </label>
            <input
              id="mobileNumber"
              type="text"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter your mobile number"
            />
          </div>
          {error && (
            <p className="text-red-500 text-sm bg-red-100 border border-red-400 px-4 py-2 mb-4 rounded-md">
              {error}
            </p>
          )}
          <div className="flex justify-center">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline">
              Registration
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ElectionAdminRegistration;
