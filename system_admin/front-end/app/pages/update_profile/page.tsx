"use client"
import axios from 'axios';
import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface FormData {
    username: string;
    name: string;
    address: string;
    contact: string;
    email: string;
    nid: string;
    gender: string;
    religion: string;
}

export default function UpdateProfile() {
    const router = useRouter();
    const [errorName, setErrorName] = useState('');
    const [errorAddress, setErrorAddress] = useState('');
    const [errorNID, setErrorNID] = useState('');
    const [errorGender, setErrorGender] = useState('');
    const [errorReligion, setErrorReligion] = useState('');
    const [errorContact, setErrorContact] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [formData, setFormData] = useState<FormData>({
        username: '',
        name: '',
        address: '',
        contact: '',
        email: '',
        nid: '',
        gender: '',
        religion: '',
    });
    let error = false;

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const username = localStorage.getItem('username');
                const token = localStorage.getItem('token');

                if (username && token) {
                    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/sys_admin/view_profile`, {
                        username: username
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

        fetchUserData();
    }, []);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const username = localStorage.getItem('username');
            const token = localStorage.getItem('token');

            if (!formData.name) {
                setErrorName('Empty Field');
                error = true;
            } else {
                setErrorName('');
            }

            if (!formData.address) {
                setErrorAddress('Empty Field');
                error = true;
            } else {
                setErrorAddress('');
            }

            const phoneNumberFormat = /^01\d{9}$/;
            if (!formData.contact) {
                setErrorContact('Empty Field');
                error = true;
            } else if (!phoneNumberFormat.test(formData.contact)) {
                setErrorContact('Invalid Format');
                error = true;
            } else {
                setErrorContact('');
            }

            const emailFormat = /^\S+@\S+\.\S+$/;
            if (!formData.email) {
                setErrorEmail('Empty Field');
                error = true;
            } else if (!emailFormat.test(formData.email)) {
                setErrorEmail('Invalid Format');
                error = true;
            } else {
                setErrorEmail('');
            }

            if (!formData.nid) {
                setErrorNID('Empty Field');
                error = true;
            } else if (isNaN(parseInt(formData.nid))) {
                setErrorNID('Number Required');
                error = true;
            } else if (formData.nid.length != 10 || parseInt(formData.nid) < 0) {
                setErrorNID('Must Be Positive 10 Digits');
                error = true;
            } else {
                setErrorNID('');
            }

            if (!formData.gender) {
                setErrorGender('Empty Field');
                error = true;
            } else {
                setErrorGender('');
            }

            if (!formData.religion) {
                setErrorReligion('Empty Field');
                error = true;
            } else {
                setErrorReligion('');
            }

            if (error == true) {
                return;
            }

            await axios.patch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/sys_admin/update_profile`, {
                username: username,
                name: formData.name,
                address: formData.address,
                contact: formData.contact,
                email: formData.email,
                nid: formData.nid,
                gender: formData.gender,
                religion: formData.religion,
                image: imageFile
            }, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                },
            });

            router.push('../pages/view_profile');
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

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setImageFile(e.target.files[0]);
        }
    };

    return (
        <div>
            <br />
            <h1 className="text-4xl font-bold text-red-900 pl-4">Update Profile</h1>
            <br />
            {formData &&
                <div className="flex justify-center items-center">
                    <div className="p-8 rounded shadow-md bg-white bg-opacity-75">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block mb-1 text-black font-bold flex justify-center">Username - {formData.username}</label>
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1 text-black">Name:</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="Enter name..."
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full bg-black text-white rounded-md focus:outline-none px-3 py-2"
                                />
                            </div>
                            {errorName && <div className="text-red-900 font-bold mb-4">{errorName}</div>}
                            <div className="mb-4">
                                <label className="block mb-1 text-black">Address:</label>
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    placeholder="Enter address..."
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="w-full bg-black text-white rounded-md focus:outline-none px-3 py-2"
                                />
                            </div>
                            {errorAddress && <div className="text-red-900 font-bold mb-4">{errorAddress}</div>}
                            <div className="mb-4">
                                <label className="block mb-1 text-black">Contact:</label>
                                <input
                                    type="text"
                                    id="contact"
                                    name="contact"
                                    placeholder="Enter contact..."
                                    value={formData.contact}
                                    onChange={handleChange}
                                    className="w-full bg-black text-white rounded-md focus:outline-none px-3 py-2"
                                />
                            </div>
                            {errorContact && <div className="text-red-900 font-bold mb-4">{errorContact}</div>}
                            <div className="mb-4">
                                <label className="block mb-1 text-black">Email:</label>
                                <input
                                    type="text"
                                    id="email"
                                    name="email"
                                    placeholder="Enter email..."
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full bg-black text-white rounded-md focus:outline-none px-3 py-2"
                                />
                            </div>
                            {errorEmail && <div className="text-red-900 font-bold mb-4">{errorEmail}</div>}
                            <div className="mb-4">
                                <label className="block mb-1 text-black">NID:</label>
                                <input
                                    type="number"
                                    id="nid"
                                    name="nid"
                                    placeholder="Enter NID..."
                                    value={formData.nid}
                                    onChange={handleChange}
                                    className="w-full bg-black text-white rounded-md focus:outline-none px-3 py-2"
                                />
                            </div>
                            {errorNID && <div className="text-red-900 font-bold mb-4">{errorNID}</div>}
                            <div className="mb-4">
                                <label className="block mb-1 text-black">Gender:</label>
                                <div className="flex">
                                    <label className="mr-4">
                                        <input
                                            type="radio"
                                            id="Male"
                                            name="gender"
                                            value="Male"
                                            checked={formData.gender === "Male"}
                                            onChange={handleChange}
                                            className="mr-2"
                                        />
                                        Male
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            id="Female"
                                            name="gender"
                                            value="Female"
                                            checked={formData.gender === "Female"}
                                            onChange={handleChange}
                                            className="mr-2"
                                        />
                                        Female
                                    </label>
                                </div>
                            </div>
                            {errorGender && <div className="text-red-900 font-bold mb-4">{errorGender}</div>}
                            <div className="mb-4">
                                <label className="block mb-1 text-black">Religion:</label>
                                <input
                                    type="text"
                                    id="religion"
                                    name="religion"
                                    placeholder="Enter religion..."
                                    value={formData.religion}
                                    onChange={handleChange}
                                    className="w-full bg-black text-white rounded-md focus:outline-none px-3 py-2"
                                />
                            </div>
                            {errorReligion && <div className="text-red-900 font-bold mb-4">{errorReligion}</div>}
                            <div className="mb-4">
                                <label className="block mb-1 text-black">Image:</label>
                                <input
                                    type="file"
                                    id="image"
                                    name="image"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="w-full bg-black text-white rounded-md focus:outline-none px-3 py-2"
                                />
                            </div>
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
            }
            <br />
        </div>
    );
}
