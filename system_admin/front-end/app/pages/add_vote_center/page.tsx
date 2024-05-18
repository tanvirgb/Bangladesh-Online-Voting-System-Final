"use client"
import axios from 'axios';
import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

interface FormData {
    center_id: string;
    center_name: string;
    emergency_contact: string;
    election_location: string;
}

export default function AddVoteCenter() {
    const router = useRouter();
    const [errorCenterId, setErrorCenterId] = useState('');
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

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
    
        if (!formData.center_id) {
            setErrorCenterId('Empty Field');
            error = true;
        } else if (isNaN(parseInt(formData.center_id))) {
            setErrorCenterId('Number Required');
            error = true;
        } else if ((parseInt(formData.center_id)) < 0) {
            setErrorCenterId('Must Be Positive');
            error = true;
        } else {
            setErrorCenterId('');
        }

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

        try {
            const token = localStorage.getItem('token');

            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/sys_admin/add_center`, {
                center_id: parseInt(formData.center_id),
                center_name: formData.center_name,
                emergency_contact: formData.emergency_contact,
                election_location: formData.election_location
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                withCredentials: true
            });

            if (response.data === "Center ID Already Exists") {
                setErrorLocation('Center ID Already Exists');
            } else {
                router.push('./view_vote_centers');
            }
        } catch (error) {
            setErrorLocation("Error Occurred -> Please Try Again Later");
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
        <div className="min-h-[75vh] flex justify-center items-center">
            <div className="p-8 rounded shadow-md bg-white bg-opacity-50">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">  
                        <label className="block mb-1 text-black">Center ID:</label>
                        <input 
                            type="number" 
                            id="center_id"
                            name="center_id"
                            placeholder="Enter Center ID..." 
                            value={formData.center_id}
                            onChange={handleChange}
                            className="w-full bg-black text-white rounded-md focus:outline-none px-3 py-2"
                        />
                    </div>
                    {errorCenterId && <div className="text-red-900 font-bold mb-4">{errorCenterId}</div>}
                    <div className="mb-4">
                        <label className="block mb-1 text-black">Center Name:</label>
                        <input
                            type="text"
                            id="center_name"
                            name="center_name"
                            placeholder="Enter Center Name..." 
                            value={formData.center_name}
                            onChange={handleChange}
                            className="w-full bg-black text-white rounded-md focus:outline-none px-3 py-2"
                        />
                    </div>
                    {errorCenterName && <div className="text-red-900 font-bold mb-4">{errorCenterName}</div>}
                    <div className="mb-4">
                        <label className="block mb-1 text-black">Emergency Contact:</label>
                        <input 
                            type="text" 
                            id="emergency_contact"
                            name="emergency_contact"
                            placeholder="Enter Emergency Contact..." 
                            value={formData.emergency_contact}
                            onChange={handleChange}
                            className="w-full bg-black text-white rounded-md focus:outline-none px-3 py-2"
                        />
                    </div>
                    {errorContact && <div className="text-red-900 font-bold mb-4">{errorContact}</div>}
                    <div className="mb-4">
                        <label className="block mb-1 text-black">Election Location: </label>
                        <input 
                            type="text"
                            id="election_location"
                            name="election_location"
                            placeholder="Enter Election Location..."
                            value={formData.election_location}
                            onChange={handleChange}
                            className="w-full bg-black text-white rounded-md focus:outline-none px-3 py-2"
                        />
                    </div>
                    {errorLocation && <div className="text-red-900 font-bold mb-4">{errorLocation}</div>}
                    <div>
                        <button
                            className="w-full bg-green-900 text-white rounded-md px-3 py-2 hover:bg-red-900 focus:outline-none"
                            type="submit"
                        >
                            Add Center
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}