"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface ProfileData {
  nid: string;
  username: string;
  password: string;
  name: string;
  address: string;
  contact: string;
  email: string;
  religion: string;
  gender: string;
  image: string;
}

export default function Profile() {
  const router = useRouter();
  const [profileData, setProfileData] = useState<ProfileData>({
    nid: '',
    username: '',
    password: '',
    name: '',
    address: '',
    contact: '',
    email: '',
    religion: '',
    gender: '',
    image: '',
  });
  const [errors, setErrors] = useState<Partial<ProfileData>>({});

  useEffect(() => {
    // Fetch profile data from the backend
    const fetchProfileData = async () => {
      const accessToken = localStorage.getItem('token');
      try {
        const response = await axios.post('http://localhost:8000/voters/profile', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true
        });
        setProfileData(response.data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateForm(profileData);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post('http://localhost:8000/voters/update', profileData);
        // Redirect to profile page or any other page after successful update
        router.push('/profile');
      } catch (error) {
        console.error('Error updating profile:', error);
        alert('Profile update failed. Please try again.');
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const validateForm = (profileData: ProfileData): Partial<ProfileData> => {
    const errors: Partial<ProfileData> = {};

    if (!profileData.nid) {
      errors.nid = 'National ID is required';
    }

    if (!profileData.username) {
      errors.username = 'Username is required';
    }

    if (!profileData.password) {
      errors.password = 'Password is required';
    }

    if (!profileData.name) {
      errors.name = 'Name is required';
    }

    if (!profileData.address) {
      errors.address = 'Address is required';
    }

    if (!profileData.contact) {
      errors.contact = 'Contact number is required';
    }

    if (!profileData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(profileData.email)) {
      errors.email = 'Invalid email address';
    }

    if (!profileData.religion) {
      errors.religion = 'Religion is required';
    }

    if (!profileData.gender) {
      errors.gender = 'Gender is required';
    }

    return errors;
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "linear-gradient(to bottom, rgb(13, 90, 44),rgb(25, 136, 98), white)" }}>
      <div className="max-w-md mx-auto mt-8">
        <h1 className="text-2xl font-bold mb-4">Update Profile</h1>
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label htmlFor="nid" className="block text-gray-700 font-bold mb-2">National ID</label>
            <input
              type="text"
              id="nid"
              name="nid"
              value={profileData.nid}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.nid && <p className="text-red-500 text-xs italic">{errors.nid}</p>}
          </div>
          {/* Repeat similar blocks for other input fields */}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
