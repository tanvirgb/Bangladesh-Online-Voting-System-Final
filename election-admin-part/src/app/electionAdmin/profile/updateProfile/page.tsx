"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "@/app/_components/Navbar";
import Footer from "@/app/_components/Footer";

const UpdateProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<any>(null);
  const [updating, setUpdating] = useState<boolean>(false);
  const [formData, setFormData] = useState<any>({
    name: "",
    username: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users/1"
      );
      setProfile(response.data);
      setFormData(response.data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      setUpdating(true);
      const response = await axios.put(
        `https://jsonplaceholder.typicode.com/users/${profile.id}`,
        formData
      );
      setProfile(response.data);
      setUpdating(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      setUpdating(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-semibold mb-6">Update Profile</h1>
          <div className="mb-6">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className="border rounded-md px-2 py-1 w-full mb-4"
            />
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              className="border rounded-md px-2 py-1 w-full mb-4"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="border rounded-md px-2 py-1 w-full mb-4"
            />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="border rounded-md px-2 py-1 w-full mb-4"
            />
          </div>
          <div className="flex justify-end">
            {updating ? (
              <button
                className="bg-blue-500 text-white font-bold py-2 px-6 rounded mr-4"
                disabled
              >
                Updating...
              </button>
            ) : (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded mr-4"
                onClick={handleUpdateProfile}
              >
                Update Profile
              </button>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UpdateProfilePage;
