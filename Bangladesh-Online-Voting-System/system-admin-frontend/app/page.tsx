"use client"
import axios from 'axios';
import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

interface FormData {
    username: string;
    password: string;
}

export default function Login() {
    const router = useRouter();
    const [errorUsername, setErrorUsername] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [formData, setFormData] = useState<FormData>({
        username: '',
        password: ''
    });
    let error = false;

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
    
        if (!formData.username) {
            setErrorUsername('Empty Field');
            error = true;
        } else if (formData.username.length > 8) {
            setErrorUsername('Maximum 8 Characters');
            error = true;
        } else {
            setErrorUsername('');
        }

        if (!formData.password) {
            setErrorPassword('Empty Field');
            error = true;
        } else if (formData.password.length < 5) {
            setErrorPassword('Minimum 5 Characters');
            error = true;
        } else {
            setErrorPassword('');
        }

        if(error == true) {
            return;
        }

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/sys_admin/login`, formData);

            if(response.data === "Invalid Username") {
                setErrorUsername("Invalid Username");
            } else if(response.data === "Invalid Password") {
                setErrorPassword("Invalid Password");
            } else {
                const  token  = response.data;
                localStorage.setItem('token', token.access_token);
                localStorage.setItem('username', formData.username);
                router.push('../pages');
            }
        } catch (error) {
            setErrorPassword("Error Occurred -> Please Try Again Later");
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
        <div className="min-h-[85vh] flex justify-center items-center">
            <div className="p-8 rounded shadow-md bg-white bg-opacity-75">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-1 text-black">Username:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Enter username..."
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full bg-black text-white rounded-md focus:outline-none px-3 py-2"
                        />
                    </div>
                    {errorUsername && <div className="text-red-900 font-bold mb-4">{errorUsername}</div>}
                    <div className="mb-4">
                        <label className="block mb-1 text-black">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter password..."
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full bg-black text-white rounded-md focus:outline-none px-3 py-2"
                        />
                    </div>
                    {errorPassword && <div className="text-red-900 font-bold mb-4">{errorPassword}</div>}
                    <div>
                        <button
                            className="w-full bg-green-900 text-white rounded-md px-3 py-2 hover:bg-red-900 focus:outline-none"
                            type="submit"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}