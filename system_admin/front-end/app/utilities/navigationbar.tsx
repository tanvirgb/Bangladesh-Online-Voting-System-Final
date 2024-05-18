"use client"
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import '../globals.css';
import { useEffect, useState } from "react";

export default function NavigationBar() {
    const router = useRouter();
    const [user, setUser] = useState('');

    const handleLogoutClick = async () => {
        const token = localStorage.getItem('token');

        try {
            const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/sys_admin/logout`, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: `Bearer ${token}`
                },
                withCredentials: true
            });

            if (response.data === "Log Out Successful!!") {
                localStorage.removeItem('username');
                localStorage.removeItem('token');
                localStorage.removeItem('update_can');
                localStorage.removeItem('update_party');
                localStorage.removeItem('update_center');
                router.push('..');
            }
        } catch (error) {
            console.error("Error:", error)
        }
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const username = localStorage.getItem('username');
                const token = localStorage.getItem('token');

                const response = await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/sys_admin/view_profile`, {
                    username: username
                }, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        Authorization: `Bearer ${token}`
                    },
                    withCredentials: true
                });

                setUser(response.data.image);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchUserData();
    }, []);

    return (
        <div className="flex justify-end bg-gray-500 text-gray-200">
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                    <li><Link legacyBehavior href="/pages"><a>Home</a></Link></li>
                    <li><Link legacyBehavior href="/pages/view_voters"><a>Voters</a></Link></li>
                    <li><Link legacyBehavior href="/pages/view_candidates"><a>Candidates</a></Link></li>
                    <li><Link legacyBehavior href="/pages/view_political_parties"><a>Political Parties</a></Link></li>
                    <li>
                        <div className="dropdown dropdown-bottom dropdown-end dropdown-hover">
                            <div tabIndex={0} role="button"><a>Vote Centers</a></div>
                            <ul tabIndex={0} className="dropdown-content z-[1] menu shadow p-2 bg-gray-500 rounded-t-none w-52">
                                <li><Link legacyBehavior href="/pages/view_vote_centers"><a>View Centers</a></Link></li>
                                <li><Link legacyBehavior href="/pages/add_vote_center"><a>Add Center</a></Link></li>
                            </ul>
                        </div>
                    </li>
                    <li><Link legacyBehavior href="/pages/view_candidates_delete_requests"><a>Requests</a></Link></li>
                    <li><Link legacyBehavior href="/pages/view_reports"><a>Reports</a></Link></li>
                    <li>
                        <div className="dropdown dropdown-bottom dropdown-end dropdown-hover">
                            <div tabIndex={0} role="button">
                                <div className="avatar">
                                    <div className="w-5 rounded-full">
                                        <img src={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/sys_admin/getimage/${user}`} alt="Profile Image" width="5" />
                                    </div>
                                </div>
                            </div>
                            <ul tabIndex={0} className="dropdown-content z-[1] menu shadow p-2 bg-gray-500 rounded-t-none w-52">
                                <li><Link legacyBehavior href="/pages/view_profile"><a>Profile</a></Link></li>
                                <li><Link legacyBehavior href="/pages/change_password"><a>Change Password</a></Link></li>
                                <li><Link legacyBehavior href=""><a onClick={handleLogoutClick}>Logout</a></Link></li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
}
