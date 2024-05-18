"use client"
import axios from "axios";
import { useEffect, useState } from "react";
import { UserCardPolls } from "../utilities/usecard";

interface Polls {
    candidate_name: string,
    vote_count: number,
    election_location: string,
    prediction: string
}

export default function Homepage() {
    const [pollsInfo, setPollInfo] = useState<Polls[]>([]);

    useEffect(() => {
        const all_polls = async () => {
            try {
                const token = localStorage.getItem('token');

                const response = await axios.get<Polls[]>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/sys_admin/view_polls`, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        Authorization: `Bearer ${token}`
                    },
                    withCredentials: true
                });
                setPollInfo(response.data);
            } catch (error) {
                console.error("Error:", error);
            }
        };

        all_polls();
    }, []);

    const printAll = (pollsInfo: Polls[]) => {
        return (
            <div>
                {pollsInfo.length === 0 ? (
                    <h1 className="text-2xl font-bold text-red-900 pl-4 flex justify-center"><br/><br/>No Voting Polls Found!</h1>
                ) : (
                    pollsInfo.map((item, index) => (
                        <div key={index} className='carousel carousel-center max-w-md p-4 rounded-box'>
                            <UserCardPolls data={item} />
                        </div>
                    ))
                )}
            </div>
        );
    }

    return (
        <div>
            <br/>
            <h1 className="text-4xl font-bold text-red-900 pl-4">Voting Polls Status</h1>
            {printAll(pollsInfo)}
        </div>
    );
}