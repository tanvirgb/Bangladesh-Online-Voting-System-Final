"use client"
import { Key, useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import UserCard3 from '@/app/components/usercard3';

interface FormData {
  nid: string;
  username: string;
  password: string;
  name: string;
  address: string;
  contact: string;
  email: string;
  religion: string;
  gender: string;
  image: File | null;
}

export default function Profile() {
  const [profile, setProfile] = useState<FormData|null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem('token');
    const username = localStorage.getItem('username');

    const fetchProfile = async () => {
      try {
        const response = await axios.post(`http://localhost:8000/voters/profile`, {
          username: username
        }, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true
        });
        const jsondata = response.data;
        console.log('jsondata:', jsondata);

        setProfile(jsondata); // Update profile state with response data
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('An error occurred while fetching profile data.');
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  useEffect(() => {
    console.log('profile:', profile); // Log updated profile value
  }, [profile]); // Trigger this useEffect whenever profile state changes

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const handleUpdateProfile = () => {
    router.push('/homepage/update_profile');
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "linear-gradient(to bottom, rgb(13, 90, 44),rgb(25, 136, 98), white)" }}>
      <div className="max-w-md mx-auto mt-8">
        <div>
          <UserCard3 data={profile}/>
          <pre>{JSON.stringify(profile, null, 2)}</pre> {/* Print JSON data */}
        </div>
        
        <button className="btn btn-accent" onClick={handleUpdateProfile}>Update Profile</button>
      </div>
    </div>
  );
}
