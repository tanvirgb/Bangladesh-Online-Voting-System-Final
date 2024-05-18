"use client"
import { UserCardCandidates } from "../../utilities/usecard";
import axios from 'axios';
import { useState, useEffect } from 'react';
import { toast, Toaster } from "react-hot-toast";

interface Candidate {
    username: string;
    name: string;
    address: string;
    contact: string;
    email: string;
    nid: string;
    gender: string;
    religion: string;
    party_name: string;
    position: string;
    election_location: string;
    image: string;
}

export default function ViewCandidates() {
    const [candidatesInfo, setCandidatesInfo] = useState<Candidate[]>([]);
    const [searchCandidate, setSearchCandidate] = useState('');
    const [searchedData, setSearchedData] = useState<Candidate | null>(null);

    useEffect(() => {
        all_candidates();
    }, []);

    const all_candidates = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get<Candidate[]>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/sys_admin/view_candidates`, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: `Bearer ${token}`
                },
                withCredentials: true
            });
            setCandidatesInfo(response.data);
        } catch (error) {
            console.error("Error:", error)
        }
    }

    const search_candidate = async () => {
        if (!searchCandidate) {
            toast.error('Empty Search')
        } else {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.post<Candidate>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/sys_admin/search_candidates`, {
                    username: searchCandidate
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

    const printAll = (candidatesInfo: Candidate[]) => {
        return (
            <div>
                {candidatesInfo.length === 0 ? (
                    <h1 className="text-2xl font-bold text-red-900 pl-4 flex justify-center"><br /><br />No Candidates Found!</h1>
                ) : (
                    candidatesInfo.map((item, index) => (
                        <div key={index} className='carousel carousel-center max-w-md p-4 rounded-box'>
                            <UserCardCandidates data={item} />
                        </div>
                    ))
                )}
            </div>
        );
    }

    const printSearch = (searchedData: Candidate | null) => {
        return (
            <div>
                {searchedData &&
                    <div className='carousel carousel-center max-w-md p-4 space-x-4 rounded-box'>
                        <UserCardCandidates data={searchedData} />
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
                <h1 className="text-4xl font-bold text-red-900 pl-4">Candidates</h1>
                <div className="flex items-center mr-4">
                    <input
                        type="text"
                        placeholder="Enter Candidate's Username..."
                        value={searchCandidate}
                        onChange={(e) => setSearchCandidate(e.target.value)}
                        className="border border-gray-300 rounded-l-full px-4 py-2 w-64 bg-black text-white"
                    />
                    <button
                        className="bg-green-900 hover:bg-red-900 text-white font-bold py-2 px-4 rounded-r-full ml-1"
                        type="button"
                        onClick={search_candidate}
                    >
                        Search
                    </button>
                </div>
            </div>
            {searchedData ? printSearch(searchedData) : printAll(candidatesInfo)}
        </div>
    );
}