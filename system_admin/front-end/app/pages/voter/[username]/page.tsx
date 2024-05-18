"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface User {
    username: string,
    name: string,
    address: string,
    contact: string,
    email: string,
    nid: string,
    gender: string,
    religion: string,
    image: string
}

interface TableRowProps {
    label: string;
    value: string;
}

const TableRow = ({ label, value }: TableRowProps) => (
    <tr>
        <td className="p-2">{label}</td>
        <td className="p-2">:</td>
        <td className="p-2">{value}</td>
    </tr>
);

export default function VoterUsername({ params }: { params: { username: string } }) {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');

                const response = await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/sys_admin/search_voter`, {
                    username: params.username
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true
                });

                setUser(response.data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchUserData();
    }, []);

    return (
        <div>
            <br />
            <h1 className="text-4xl font-bold text-red-900 pl-4">Voter Details</h1>
            <div className='flex item-center justify-center'>
                { user ? (
                    <div className='carousel carousel-center max-w-md p-4 space-x-4 rounded-box'>
                        <div className="card card-compact w-80 bg-yellow-200 bg-opacity-75 text-black carousel-item">
                            <br />
                            <figure><img src={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/sys_admin/getimage/${user.image}`} alt="Profile Image" width="250" /></figure>
                            <div className="card-body">
                                <h2 className="card-title justify-center">Username - {params.username}</h2>
                                <table className="border-collapse w-full">
                                    <tbody>
                                        <TableRow label="Name" value={user.name} />
                                        <TableRow label="Address" value={user.address} />
                                        <TableRow label="Contact" value={user.contact} />
                                        <TableRow label="Email" value={user.email} />
                                        <TableRow label="NID" value={user.nid} />
                                        <TableRow label="Gender" value={user.gender} />
                                        <TableRow label="Religion" value={user.religion} />
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                ) : (
                    <h1 className="text-2xl font-bold text-red-900 pl-4 flex justify-center"><br /><br />No Voter Found!</h1>
                )}
            </div>
        </div>
    );
}