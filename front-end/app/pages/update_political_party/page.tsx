"use client"
import axios from 'axios';
import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface FormData {
    party_id: string;
    party_name: string;
    party_leader: string;
    founding_date: string;
    party_description: string;
}

export default function UpdatePoliticalParty() {
    const router = useRouter();
    const [errorName, setErrorName] = useState('');
    const [errorLeader, setErrorLeader] = useState('');
    const [errorDate, setErrorDate] = useState('');
    const [errorDescription, setErrorDescription] = useState('');
    const [formData, setFormData] = useState<FormData>({
        party_id: '',
        party_name: '',
        party_leader: '',
        founding_date: '',
        party_description: ''
    });
    let error = false;

    useEffect(() => {
        const fetchPartyData = async () => {
            try {
                const party_id = localStorage.getItem('update_party');
                const token = localStorage.getItem('token');
                
                if (party_id && token) {
                    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/sys_admin/search_parties`, {
                        party_id: parseInt(party_id)
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

        fetchPartyData();
    }, []);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const party_id = localStorage.getItem('update_party');
            const token = localStorage.getItem('token');
            console.log(party_id);
            if (party_id && token) {
                if (!formData.party_name) {
                    setErrorName('Empty Field');
                    error = true;
                } else {
                    setErrorName('');
                }

                if (!formData.party_leader) {
                    setErrorLeader('Empty Field');
                    error = true;
                } else {
                    setErrorLeader('');
                }

                if (!formData.party_description) {
                    setErrorDescription('Empty Field');
                    error = true;
                } else {
                    setErrorDescription('');
                }

                if (!formData.founding_date) {
                    setErrorDate('Empty Field');
                    error = true;
                } else {
                    setErrorDate('');
                }

                if (error == true) {
                    return;
                }

                await axios.patch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/sys_admin/update_parties`, {
                    party_id: parseInt(party_id),
                    party_name: formData?.party_name,
                    party_leader: formData?.party_leader,
                    founding_date: formData?.founding_date,
                    party_description: formData?.party_description
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                router.push('../pages/view_political_parties');
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
            <br />
            <h1 className="text-4xl font-bold text-red-900 pl-4">Update Political Party</h1>
            <br />
            <div className="flex justify-center items-center">
                <div className="p-8 rounded shadow-md bg-white bg-opacity-75">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block mb-1 text-black font-bold flex justify-center">Party ID - {formData.party_id}</label>
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1 text-black">Party Name:</label>
                            <input
                                type="text"
                                id="party_name"
                                name="party_name"
                                placeholder="Enter party name..."
                                value={formData.party_name}
                                onChange={handleChange}
                                className="w-full bg-black text-white rounded-md focus:outline-none px-3 py-2"
                            />
                        </div>
                        {errorName && <div className="text-red-900 font-bold mb-4">{errorName}</div>}
                        <div className="mb-4">
                            <label className="block mb-1 text-black">Party Leader:</label>
                            <input
                                type="text"
                                id="party_leader"
                                name="party_leader"
                                placeholder="Enter party leader..."
                                value={formData.party_leader}
                                onChange={handleChange}
                                className="w-full bg-black text-white rounded-md focus:outline-none px-3 py-2"
                            />
                        </div>
                        {errorLeader && <div className="text-red-900 font-bold mb-4">{errorLeader}</div>}
                        <div className="mb-4">
                            <label className="block mb-1 text-black">Founding Date:</label>
                            <input
                                type="date"
                                id="founding_date"
                                name="founding_date"
                                placeholder="Enter founding date..."
                                value={formData.founding_date}
                                onChange={handleChange}
                                className="w-full bg-black text-white rounded-md focus:outline-none px-3 py-2"
                            />
                        </div>
                        {errorDate && <div className="text-red-900 font-bold mb-4">{errorDate}</div>}
                        <div className="mb-4">
                            <label className="block mb-1 text-black">Party Description:</label>
                            <input
                                type="text"
                                id="party_description"
                                name="party_description"
                                placeholder="Enter party description..."
                                value={formData.party_description}
                                onChange={handleChange}
                                className="w-full bg-black text-white rounded-md focus:outline-none px-3 py-2"
                            />
                        </div>
                        {errorDescription && <div className="text-red-900 font-bold mb-4">{errorDescription}</div>}
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
            <br />
        </div>
    );
}