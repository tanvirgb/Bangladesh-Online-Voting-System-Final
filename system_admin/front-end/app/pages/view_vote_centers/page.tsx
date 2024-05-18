"use client"
import { UserCardCenters } from "../../utilities/usecard";
import axios from 'axios';
import { useState, useEffect } from 'react';
import { toast, Toaster } from "react-hot-toast";

interface Center {
    center_id: number;
    center_name: string;
    election_location: string;
    emergency_contact: string;
}

export default function ViewVoteCenters() {
    const [centerInfo, setCenterInfo] = useState<Center[]>([]);
    const [searchCenter, setSearchCenter] = useState('');
    const [searchedData, setSearchedData] = useState<Center | null>(null);

    useEffect(() => {
        const all_center = async () => {
            const token = localStorage.getItem('token');

            try {
                const response = await axios.get<Center[]>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/sys_admin/view_centers`, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        Authorization: `Bearer ${token}`
                    },
                    withCredentials: true
                });

                setCenterInfo(response.data);
            } catch (error) {
                console.error("Error:", error)
            }
        }

        all_center();
    }, []);

    const search_center = async () => {
        if (!searchCenter) {
            toast.error('Empty Search')
        } else {
            const token = localStorage.getItem('token');

            const response = await axios.post<Center>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/sys_admin/search_center`, {
                center_id: parseInt(searchCenter)
            }, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: `Bearer ${token}`
                },
                withCredentials: true
            });

            if (typeof response.data === "string") {
                toast.error('Invalid Center ID');
            } else {
                setSearchedData(response.data);
            }
        }
    };

    const printAll = (centerInfo: Center[]) => {
        return (
            <div>
                {centerInfo.length === 0 ? (
                    <h1 className="text-2xl font-bold text-red-900 pl-4 flex justify-center"><br /><br />No Vote Centers Found!</h1>
                ) : (
                    centerInfo.map((item, index) => (
                        <div key={index} className='carousel carousel-center max-w-md p-4 rounded-box'>
                            <UserCardCenters data={item} />
                        </div>
                    ))
                )}
            </div>
        );
    }

    const printSearch = (searchedData: Center | null) => {
        return (
            <div>
                {searchedData &&
                    <div className='carousel carousel-center max-w-md p-4 space-x-4 rounded-box'>
                        <UserCardCenters data={searchedData} />
                    </div>
                }
            </div>
        );
    }

    return (
        <div>
            <Toaster />
            <br />
            <div className="flex items-center justify-between">
                <h1 className="text-4xl font-bold text-red-900 pl-4">Vote Centers</h1>
                <div className="flex items-center mr-4">
                    <input
                        type="text"
                        placeholder="Enter Center's ID..."
                        value={searchCenter}
                        onChange={(e) => setSearchCenter(e.target.value)}
                        className="border border-gray-300 rounded-l-full px-4 py-2 w-64 bg-black text-white"
                    />
                    <button
                        className="bg-green-900 hover:bg-red-900 text-white font-bold py-2 px-4 rounded-r-full ml-1"
                        type="button"
                        onClick={search_center}
                    >
                        Search
                    </button>
                </div>
            </div>
            {searchedData ? printSearch(searchedData) : printAll(centerInfo)}
        </div>
    );
}