import axios from "axios";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useState } from "react";

const ElectionAdminRegistration = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [number, setNumber] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleChangeConfirmPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handleChangeAddress = (e: ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  const handleChangeNumber = (e: ChangeEvent<HTMLInputElement>) => {
    setNumber(e.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword ||
      !address ||
      !number
    ) {
      setError("All fields are required");
    } else if (!isValidEmail(email)) {
      setError("Invalid email address");
    } else if (password !== confirmPassword) {
      setError("Passwords do not match");
    } else {
      try {
        const formData = {
          name: name,
          email: email,
          password: password,
          address: address,
          number: number,
        };

        let response = await axios.post(
          "http://localhost:3000/api/electionAdmin",
          formData
        );

        console.log("User registered successfully:", response.data);

        setSuccessMessage("User registered successfully!");
        setError("");

        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setAddress("");
        setNumber("");
        router.push("/electionAdmin/dashboard");
      } catch (error: any) {
        console.error("Error registering user:", error.message);

        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          setError(error.response.data.error);
        } else {
          setError("An error occurred while registering the user");
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
              onChange={handleChangeName}
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
              onChange={handleChangeEmail}
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
              onChange={handleChangePassword}
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
              onChange={handleChangeConfirmPassword}
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
              onChange={handleChangeAddress}
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
              onChange={handleChangeNumber}
              className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter your mobile number"
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
              Registration
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ElectionAdminRegistration;
