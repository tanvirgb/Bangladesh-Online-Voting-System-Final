"use client"
import { UserCardParty } from "../../utilities/usecard";
import axios from 'axios';
import { useState, useEffect } from 'react';
import { toast, Toaster } from "react-hot-toast";

interface Party {
    party_id: number;
    party_name: string;
    party_leader: string;
    party_description: string;
    founding_date: string;
}

export default function ViewPoliticalParties() {
    const [partyInfo, setPartyInfo] = useState<Party[]>([]);
    const [searchParty, setSearchParty] = useState('');
    const [searchedData, setSearchedData] = useState<Party | null>(null);

    useEffect(() => {
        const all_party = async () => {
            try {
                const token = localStorage.getItem('token');

                const response = await axios.get<Party[]>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/sys_admin/view_parties`, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        Authorization: `Bearer ${token}`
                    },
                    withCredentials: true
                });

                setPartyInfo(response.data);
            } catch (error) {
                console.error("Error:", error);
            }
        }

        all_party();
    }, []);

    const search_party = async () => {
        if (!searchParty) {
            toast.error('Empty Search')
        } else {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.post<Party>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/sys_admin/search_parties`, {
                    party_id: parseInt(searchParty)
                }, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        Authorization: `Bearer ${token}`
                    },
                    withCredentials: true
                });

                if (typeof response.data === "string") {
                    toast.error('Invalid Party ID');
                } else {
                    setSearchedData(response.data);
                }
            } catch (error) {
                console.error("Error:", error)
            }
        }
    };

    const printAll = (partyInfo: Party[]) => {
        return (
            <div>
                {partyInfo.length === 0 ? (
                    <h1 className="text-2xl font-bold text-red-900 pl-4 flex justify-center"><br /><br />No Political Parties Found!</h1>
                ) : (
                    partyInfo.map((item, index) => (
                        <div key={index} className='carousel carousel-center max-w-md p-4 rounded-box'>
                            <UserCardParty data={item} />
                        </div>
                    ))
                )}
            </div>
        );
    }

    const printSearch = (searchedData: Party | null) => {
        return (
            <div>
                {searchedData &&
                    <div className='carousel carousel-center max-w-md p-4 space-x-4 rounded-box'>
                        <UserCardParty data={searchedData} />
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
                <h1 className="text-4xl font-bold text-red-900 pl-4">Political Parties</h1>
                <div className="flex items-center mr-4">
                    <input
                        type="text"
                        placeholder="Enter Party's ID..."
                        value={searchParty}
                        onChange={(e) => setSearchParty(e.target.value)}
                        className="border border-gray-300 rounded-l-full px-4 py-2 w-64 bg-black text-white"
                    />
                    <button
                        className="bg-green-900 hover:bg-red-900 text-white font-bold py-2 px-4 rounded-r-full ml-1"
                        type="button"
                        onClick={search_party}
                    >
                        Search
                    </button>
                </div>
            </div>
            {searchedData ? printSearch(searchedData) : printAll(partyInfo)}
        </div>
    );
}