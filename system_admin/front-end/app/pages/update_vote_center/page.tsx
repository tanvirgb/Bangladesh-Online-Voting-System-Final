"use client"
import axios from 'axios';
import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface FormData {
    center_id: string;
    center_name: string;
    emergency_contact: string;
    election_location: string;
}

export default function UpdateVoteCenter() {
    const router = useRouter();
    const [errorCenterName, setErrorCenterName] = useState('');
    const [errorContact, setErrorContact] = useState('');
    const [errorLocation, setErrorLocation] = useState('');
    const [formData, setFormData] = useState<FormData>({
        center_id: '',
        center_name: '',
        emergency_contact: '',
        election_location: ''
    });
    let error = false;

    useEffect(() => {
        const fetchCenterData = async () => {
            try {
                const center_id = localStorage.getItem('update_center');
                const token = localStorage.getItem('token');
                
                if (center_id) {
                    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/sys_admin/search_center`, {
                        center_id: parseInt(center_id)
                    }, { 
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    
                    setFormData(response.data);
                }
            } catch (error) {
                console.error('Error:', error);
            } 
        };
        
        fetchCenterData();
    }, []);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const center_id = localStorage.getItem('update_center');
            const token = localStorage.getItem('token');

            if(center_id && token) {
                if (!formData.center_name) {
                    setErrorCenterName('Empty Field');
                    error = true;
                } else {
                    setErrorCenterName('');
                }
        
                if (!formData.election_location) {
                    setErrorLocation('Empty Field');
                    error = true;
                } else {
                    setErrorLocation('');
                }
        
                const phoneNumberFormat = /^01\d{9}$/;
                if (!formData.emergency_contact) {
                    setErrorContact('Empty Field');
                    error = true;
                } else if (!phoneNumberFormat.test(formData.emergency_contact)) {
                    setErrorContact('Invalid Format');
                    error = true;
                } else {
                    setErrorContact('');
                }
        
                if(error == true) {
                    return;
                }

                await axios.patch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/sys_admin/update_center`, {
                    center_id: parseInt(center_id),
                    center_name: formData?.center_name,
                    election_location: formData?.election_location,
                    emergency_contact: formData?.emergency_contact
                }, { 
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                router.push('../pages/view_vote_centers');
            }
        } catch (error) {
            console.error('Error:', error);
        } 
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div>
            <br/>
            <h1 className="text-4xl font-bold text-red-900 pl-4">Update Vote Center</h1>
            <br/>
            <div className="flex justify-center items-center">
                <div className="p-8 rounded shadow-md bg-white bg-opacity-75">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block mb-1 text-black font-bold flex justify-center">Center ID - {formData.center_id}</label>
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1 text-black">Center Name:</label>
                            <input
                                type="text"
                                id="center_name"
                                name="center_name"
                                placeholder="Enter center name..."
                                value={formData.center_name}
                                onChange={handleChange}
                                className="w-full bg-black text-white rounded-md focus:outline-none px-3 py-2"
                            />
                        </div>
                        {errorCenterName && <div className="text-red-900 font-bold mb-4">{errorCenterName}</div>}
                        <div className="mb-4">
                            <label className="block mb-1 text-black">Election Location:</label>
                            <input
                                type="text"
                                id="election_location"
                                name="election_location"
                                placeholder="Enter election location..."
                                value={formData.election_location}
                                onChange={handleChange}
                                className="w-full bg-black text-white rounded-md focus:outline-none px-3 py-2"
                            />
                        </div>
                        {errorLocation && <div className="text-red-900 font-bold mb-4">{errorLocation}</div>}
                        <div className="mb-4">
                            <label className="block mb-1 text-black">Emergency Contact:</label>
                            <input
                                type="text"
                                id="emergency_contact"
                                name="emergency_contact"
                                placeholder="Enter emergency contact..."
                                value={formData.emergency_contact}
                                onChange={handleChange}
                                className="w-full bg-black text-white rounded-md focus:outline-none px-3 py-2"
                            />
                        </div>
                        {errorContact && <div className="text-red-900 font-bold mb-4">{errorContact}</div>}
                        <div>
                            <button
                                className="w-full bg-green-900 text-white rounded-md px-3 py-2 hover:bg-red-900 focus:outline-none"
                                type="submit"
                            >
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <br/>
        </div>
    );
}
