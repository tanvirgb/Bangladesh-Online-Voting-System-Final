"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";

interface Reports {
    report_id: number;
    username: string;
    issue: string;
}

export default function ViewReports() {
    const [reports, setReports] = useState<Reports[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const token = localStorage.getItem('token');

                const response = await axios.get<Reports[]>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/sys_admin/view_reports`, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        Authorization: `Bearer ${token}`
                    },
                    withCredentials: true
                });

                setReports(response.data);
            } catch (error) {
                console.error("Error:", error);
            }
        }

        fetchData();
    }, []);

    return (
        <div>
            <br/>
            <h1 className="text-4xl font-bold text-red-900 pl-4">Website Bug Reports</h1>
            <br/>
            <div className="flex item-center justify-center">
                {reports.length > 0 ? (
                    <div className="overflow-x-auto rounded-lg">
                        <table className="min-w-full divide-y divide-gray-900">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 bg-gray-500 text-left font-medium text-gray-900 bg-opacity-75 uppercase tracking-wider"></th>
                                    <th className="px-6 py-3 bg-gray-500 text-left font-medium text-gray-900 bg-opacity-75 uppercase tracking-wider">Report ID</th>
                                    <th className="px-6 py-3 bg-gray-500 text-left font-medium text-gray-900 bg-opacity-75 uppercase tracking-wider">Username</th>
                                    <th className="px-6 py-3 bg-gray-500 text-left font-medium text-gray-900 bg-opacity-75 uppercase tracking-wider">Issue</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {reports.map((item, index) => (
                                    <tr key={index} className={index % 2 === 0 ? 'bg-yellow-100 bg-opacity-75' : 'bg-yellow-200 bg-opacity-75'}>
                                        <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{item.report_id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{item.username}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{item.issue}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <h1 className="text-2xl font-bold text-red-900 pl-4"><br/><br/>No Bug Reports Found!</h1>
                )}
            </div>
        </div>
    );
}