"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "@/app/_components/Navbar";
import Footer from "@/app/_components/Footer";
import Link from "next/link";

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<any>(null);
  const [updating, setUpdating] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);
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

  const handleDeleteProfile = async () => {
    try {
      setDeleting(true);
      await axios.delete(
        `https://jsonplaceholder.typicode.com/users/${profile.id}`
      );
      setProfile(null);
      setDeleting(false);
    } catch (error) {
      console.error("Error deleting profile:", error);
      setDeleting(false);
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
        {profile ? (
          <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-semibold mb-6">Profile</h1>
            <div className="mb-6">
              <p className="text-lg mb-2">
                <span className="font-semibold">Name:</span>{" "}
                {updating ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="border rounded-md px-2 py-1 w-full"
                  />
                ) : (
                  profile.name
                )}
              </p>
              <p className="text-lg mb-2">
                <span className="font-semibold">Username:</span>{" "}
                {updating ? (
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="border rounded-md px-2 py-1 w-full"
                  />
                ) : (
                  profile.username
                )}
              </p>
              <p className="text-lg mb-2">
                <span className="font-semibold">Email:</span>{" "}
                {updating ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="border rounded-md px-2 py-1 w-full"
                  />
                ) : (
                  profile.email
                )}
              </p>
              <p className="text-lg mb-2">
                <span className="font-semibold">Phone:</span>{" "}
                {updating ? (
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="border rounded-md px-2 py-1 w-full"
                  />
                ) : (
                  profile.phone
                )}
              </p>
            </div>
            <div className="flex justify-end">
              <Link href="/electionAdmin/profile/updateProfile">
                {updating ? (
                  <button
                    className="bg-blue-500 text-white font-bold py-2 px-6 rounded mr-4"
                    disabled
                  >
                    Loading...
                  </button>
                ) : (
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded mr-4">
                    Update Profile
                  </button>
                )}
              </Link>
              {deleting ? (
                <button
                  className="bg-red-500 text-white font-bold py-2 px-6 rounded"
                  disabled
                >
                  Deleting...
                </button>
              ) : (
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-6 rounded"
                  onClick={handleDeleteProfile}
                >
                  Delete Profile
                </button>
              )}
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ProfilePage;
