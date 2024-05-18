"use client"
import axios from 'axios';
import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

interface FormData {
    old_pass: string;
    new_pass: string;
}

export default function ChangePassword() {
    const router = useRouter();
    const [errorOldPass, setErrorOldPass] = useState('');
    const [errorNewPass, setErrorNewPass] = useState('');
    const [formData, setFormData] = useState<FormData>({
        old_pass: '',
        new_pass: ''
    });
    let error = false;

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!formData.old_pass) {
            setErrorOldPass('Empty Field');
            error = true;
        } else if (formData.old_pass.length < 5) {
            setErrorOldPass('Minimum 5 Characters');
            error = true;
        } else {
            setErrorOldPass('');
        }

        if (!formData.new_pass) {
            setErrorNewPass('Empty Field');
            error = true;
        } else if (formData.new_pass.length < 5) {
            setErrorNewPass('Minimum 5 Characters');
            error = true;
        } else {
            setErrorNewPass('');
        }

        if(error == true) {
            return;
        }

        try {
            const username = localStorage.getItem('username');
            const token = localStorage.getItem('token');

            const response = await axios.patch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/sys_admin/change_pass`, {
                username: username,
                old_pass: formData.old_pass,
                new_pass: formData.new_pass
            }, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: `Bearer ${token}`
                },
                withCredentials: true
            });

            if (response.data === "Invalid Password"){
                setErrorOldPass("Invalid Password");
            } else {
                router.push('../pages');
            }
        } catch (error) {
            setErrorNewPass("Error Occurred -> Please Try Again Later");
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
                        <label className="block mb-1 text-black">Old Password:</label>
                        <input
                            type="password"
                            id="old_pass"
                            name="old_pass"
                            placeholder="Enter Old Password..."
                            value={formData.old_pass}
                            onChange={handleChange}
                            className="w-full bg-black text-white rounded-md focus:outline-none px-3 py-2"
                        />
                    </div>
                    {errorOldPass && <div className="text-red-900 font-bold mb-4">{errorOldPass}</div>}
                    <div className="mb-4">
                        <label className="block mb-1 text-black">New Password:</label>
                        <input
                            type="password"
                            id="new_pass"
                            name="new_pass"
                            placeholder="Enter New Password..."
                            value={formData.new_pass}
                            onChange={handleChange}
                            className="w-full bg-black text-white rounded-md focus:outline-none px-3 py-2"
                        />
                    </div>
                    {errorNewPass && <div className="text-red-900 font-bold mb-4">{errorNewPass}</div>}
                    <div>
                        <button
                            className="w-full bg-green-900 text-white rounded-md px-3 py-2 hover:bg-red-900 focus:outline-none"
                            type="submit"
                        >
                            Change Password
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}