"use client"
import axios from "axios";
import { useEffect, useState } from "react";
import { UserCardVoters } from "../../utilities/usecard";
import { toast, Toaster } from "react-hot-toast";

interface Voter {
    username: string;
    name: string;
    address: string;
    contact: string;
    email: string;
    nid: string;
    gender: string;
    religion: string;
    image: string;
}

export default function ViewVoters() {
    const [votersInfo, setVotersInfo] = useState<Voter[]>([]);
    const [searchVoter, setSearchVoter] = useState('');
    const [searchedData, setSearchedData] = useState<Voter | null>(null);

    useEffect(() => {
        const all_voters = async () => {
            const token = localStorage.getItem('token');
            try {


                const response = await axios.get<Voter[]>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/sys_admin/view_voters`, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        Authorization: `Bearer ${token}`
                    },
                    withCredentials: true
                });

                setVotersInfo(response.data);
            } catch (error) {
                console.error("Error:", error)
            }
        }

        all_voters();
    }, []);

    const search_voter = async () => {
        if (!searchVoter) {
            toast.error('Empty Search')
        } else {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.post<Voter>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/sys_admin/search_voter`, {
                    username: searchVoter
                }, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        Authorization: `Bearer ${token}`
                    },
                    withCredentials: true
                });

                if (typeof response.data === "string") {
                    toast.error('Invalid Username');
                } else {
                    setSearchedData(response.data);
                }
            } catch (error) {
                console.error("Error:", error)
            }
        }
    };

    const printAll = (votersInfo: Voter[]) => {
        return (
            <div>
                {votersInfo.length === 0 ? (
                    <h1 className="text-2xl font-bold text-red-900 pl-4 flex justify-center"><br /><br />No Voters Found!</h1>
                ) : (
                    votersInfo.map((item, index) => (
                        <div key={index} className='carousel carousel-center max-w-md p-4 rounded-box'>
                            <UserCardVoters data={item} />
                        </div>
                    ))
                )}
            </div>
        );
    }

    const printSearch = (searchedData: Voter | null) => {
        return (
            <div>
                {searchedData &&
                    <div className='carousel carousel-center max-w-md p-4 space-x-4 rounded-box'>
                        <UserCardVoters data={searchedData} />
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
                <h1 className="text-4xl font-bold text-red-900 pl-4">Voters</h1>
                <div className="flex items-center mr-4">
                    <input
                        type="text"
                        placeholder="Enter Voter's Username..."
                        value={searchVoter}
                        onChange={(e) => setSearchVoter(e.target.value)}
                        className="border border-gray-300 rounded-l-full px-4 py-2 w-64 bg-black text-white"
                    />
                    <button
                        className="bg-green-900 hover:bg-red-900 text-white font-bold py-2 px-4 rounded-r-full ml-1"
                        type="button"
                        onClick={search_voter}
                    >
                        Search
                    </button>
                </div>
            </div>
            {searchedData ? printSearch(searchedData) : printAll(votersInfo)}
        </div>
    );
}