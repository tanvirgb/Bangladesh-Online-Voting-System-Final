import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState, ChangeEvent, FormEvent } from "react";

const ElectionAdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Email and password are required");
    } else if (!isValidEmail(email)) {
      setError("Invalid email address");
    } else {
      try {
        let response = await axios.post(
          "http://localhost:3000/api/electionAdmin",
          {
            method: "POST",
            body: JSON.stringify({ email, password, login: true }),
          }
        );

        console.log("User login successfully:", response.data);

        setSuccessMessage("User login successfully!");
        console.log({ email, password });
        setEmail("");
        setPassword("");
        setError("");
        if (response.data.success) {
          router.push("/electionAdmin/dashboard");
        }
      } catch (error: any) {
        console.error("Error in login:", error.message);

        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          setError(error.response.data.error);
        } else {
          setError("An error occurred while login");
        }
        setSuccessMessage("");
      }
    }
  };

  const isValidEmail = (email: string) => {
    const emailPattern = /^\S+@\S+\.\S+$/;
    return emailPattern.test(email);
  };

  return (
    <>
      <h3 className="text-3xl font-bold mb-6 text-center">Login</h3>
      <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-md">
        <form className="px-8 py-6" onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChangeEmail}
              className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChangePassword}
              className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter your password"
            />
          </div>
          {error && (
            <p className="text-red-500 text-sm bg-red-100 border border-red-400 px-4 py-2 mb-4 rounded-md">
              {error}
            </p>
          )}
          {successMessage && (
            <p className="text-green-500 text-sm bg-green-100 border border-green-400 px-4 py-2 mb-4 rounded-md">
              {successMessage}
            </p>
          )}
          <div className="flex justify-center">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline">
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ElectionAdminLogin;
