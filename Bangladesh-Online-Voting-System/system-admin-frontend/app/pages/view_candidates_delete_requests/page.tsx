"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";

interface DeleteRequest {
    request_id: number;
    username: string;
    issue: string;
}

export default function ViewCandidatesDeleteRequests() {
    const [deleteRequests, setDeleteRequests] = useState<DeleteRequest[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const token = localStorage.getItem('token');

                const response = await axios.get<DeleteRequest[]>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/sys_admin/view_request`, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        Authorization: `Bearer ${token}`
                    },
                    withCredentials: true
                });

                setDeleteRequests(response.data);
            } catch (error) {
                console.error("Error:", error);
            }
        }

        fetchData();
    }, []);

    return (
        <div>
            <br/>
            <h1 className="text-4xl font-bold text-red-900 pl-4">Candidates' Account Delete Requests</h1>
            <br/>
            <div className="flex item-center justify-center">
                {deleteRequests.length > 0 ? (
                    <div className="overflow-x-auto rounded-lg">
                        <table className="min-w-full divide-y divide-gray-900">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 bg-gray-500 text-left font-medium text-gray-900 bg-opacity-75 uppercase tracking-wider"></th>
                                    <th className="px-6 py-3 bg-gray-500 text-left font-medium text-gray-900 bg-opacity-75 uppercase tracking-wider">Request ID</th>
                                    <th className="px-6 py-3 bg-gray-500 text-left font-medium text-gray-900 bg-opacity-75 uppercase tracking-wider">Candidate's Username</th>
                                    <th className="px-6 py-3 bg-gray-500 text-left font-medium text-gray-900 bg-opacity-75 uppercase tracking-wider">Issue</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {deleteRequests.map((item, index) => (
                                    <tr key={index} className={index % 2 === 0 ? 'bg-yellow-100 bg-opacity-75' : 'bg-yellow-200 bg-opacity-75'}>
                                        <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{item.request_id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{item.username}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{item.issue}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <h1 className="text-2xl font-bold text-red-900 pl-4"><br/><br/>No Delete Requests Found!</h1>
                )}
            </div>
        </div>
    );
}