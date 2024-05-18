"use client"

import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface FormData {
  report: string;
   
}

export default function Report() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    report: ''
    
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

    try {
      const accessToken = localStorage.getItem('token');
      const storedUsername = localStorage.getItem('username');

      const response = await axios.post('http://localhost:8000/voters/complaint', storedUsername,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
        withCredentials: true,
      }
      );
      console.log(response.data);

      const token = response.data;
      console.log(token.access_token);
      localStorage.setItem('token', token.access_token);
      localStorage.setItem('report', formData.report);

      router.push('/homepage');
    } catch (error) {
      console.error('Error :', error);
      setErrors(['Error in submitting report!']);
    }
  };


return (
  <div className="min-h-screen flex items-center justify-center" style={{ background: "linear-gradient(to bottom, rgb(13, 90, 44),rgb(25, 136, 98), white)" }}>
    <div className="max-w-md w-full space-y-8">
      <div className="card bg-white">
        <div className="card-body">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Report</h2>
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
                <label htmlFor="report" className="sr-only">Report</label>
                <input id="report" name="report" type="text" autoComplete="report" className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Write an issue" value={formData.report} onChange={handleChange} />
              </div>

            <div>
              <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-red-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-9">
                Submit
              </button>
            </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
);

}
