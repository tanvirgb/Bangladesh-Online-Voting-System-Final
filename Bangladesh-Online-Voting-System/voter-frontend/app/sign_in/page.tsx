"use client"
import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface FormData {
  username: string;
  password: string;
}

export default function Signin() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState<string[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const newErrors: string[] = [];

    if (!formData.username.trim()) {
      newErrors.push('Please enter your username');
    } else if (!validateUsername(formData.username)) {
      newErrors.push('Incorrect username');
    }

    if (!formData.password.trim()) {
      newErrors.push('Please enter your password');
    } else if (!validatePassword(formData.password)) {
      newErrors.push('Incorrect password');
    }

    try {
      const response = await axios.post('http://localhost:8000/voters/login', formData);
      console.log(response.data);

      const token = response.data;
      console.log(token.access_token);
      localStorage.setItem('token', token.access_token);
      localStorage.setItem('username', formData.username);

      router.push('/homepage');
    } catch (error) {
      console.error('Error signing in:', error);
      setErrors(['Sign in failed. Please check your credentials.']);
    }
  };

  const validateUsername = (username: string) => {
    const un = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return un.test(username);
  };

  const validatePassword = (password: string) => {
    return password.length >= 8;
  };


return (
  <div className="min-h-screen flex items-center justify-center" style={{ background: "linear-gradient(to bottom, rgb(13, 90, 44),rgb(25, 136, 98), white)" }}>
    <div className="max-w-md w-full space-y-8">
      <div className="card bg-white">
        <div className="card-body">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign In</h2>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {errors.length > 0 && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
                <ul>
                  {errors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="username" className="sr-only">Username</label>
                <input id="username" name="username" type="text" autoComplete="username" className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Username" value={formData.username} onChange={handleChange} />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input id="password" name="password" type="password" autoComplete="current-password" className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" value={formData.password} onChange={handleChange} />
              </div>
            </div>
            <div>
              <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-white-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Sign In
              </button>
            
              <span className="text-center text-black-700">Not a voter yet?</span>
              <Link href="/sign_up">
                <button id="su" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-white-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Sign Up
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
);

}
