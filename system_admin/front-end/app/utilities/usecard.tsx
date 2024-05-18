"use client"
import axios from "axios";
import { useRouter } from 'next/navigation';
import { toast, Toaster } from "react-hot-toast";
import Link from "next/link";

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

export function UserCardPolls(props: any) {
    return (
        <div className="card card-compact w-80 bg-yellow-200 bg-opacity-75 text-black carousel-item">
            <div className="card-body flex flex-col items-center justify-center">
                <figure className="radial-progress text-green-900 font-bold" style={{ "--value": parseInt(props.data.prediction), "--size": "12rem", "--thickness": "8px" } as any} role="progressbar">
                    Win Prediction: {props.data.prediction}
                </figure>
                <h2 className="card-title justify-center">Candidate Name - {props.data.candidate_name}</h2>
                <table className="border-collapse w-full">
                    <tbody>
                        <TableRow label="Vote Count" value={props.data.vote_count} />
                        <TableRow label="Election Location" value={props.data.election_location} />
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export function UserCardCandidates(props: any) {
    const router = useRouter();

    const delete_candidate = async (deleteCandidate: string) => {
        const token = localStorage.getItem('token');

        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/sys_admin/delete_candidate`, {
                username: deleteCandidate
            }, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: `Bearer ${token}`
                },
                withCredentials: true
            });

            toast.success('Account Deleted');
            window.location.reload();
        } catch (error) {
            console.error("Error:", error)
        }
    };

    const handleUpdate = async (username: string) => {
        localStorage.setItem('update_can', username);
        router.push('../pages/update_candidate');
    };

    return (
        <div className="card card-compact w-80 bg-yellow-200 bg-opacity-75 text-black carousel-item">
            <Toaster />
            <br />
            <figure><img src={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/sys_admin/getimage/${props.data.image}`} alt="Candidate Image" width="250" /></figure>
            <div className="card-body">
                <h2 className="card-title justify-center">
                    <Link legacyBehavior href={`/pages/candidate/${props.data.username}`}><a>Username - {props.data.username}</a></Link>
                </h2>
                <table className="border-collapse w-full">
                    <tbody>
                        <TableRow label="Name" value={props.data.name} />
                        <TableRow label="Contact" value={props.data.contact} />
                    </tbody>
                </table>
                <div className="card-actions justify-end">
                    <button className="btn btn-error" onClick={() => delete_candidate(props.data.username)}>Delete</button>
                    <button className="btn btn-warning" onClick={() => handleUpdate(props.data.username)}>Update</button>
                </div>
            </div>
        </div>
    );
}

export function UserCardVoters(props: any) {
    return (
        <div className="card card-compact w-80 bg-yellow-200 bg-opacity-75 text-black carousel-item">
            <br />
            <figure><img src={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/sys_admin/getimage/${props.data.image}`} alt="Voter Image" width="250" /></figure>
            <div className="card-body">
                <h2 className="card-title justify-center">
                    <Link legacyBehavior href={`/pages/voter/${props.data.username}`}><a>Username - {props.data.username}</a></Link>
                </h2>
                <table className="border-collapse w-full">
                    <tbody>
                        <TableRow label="Name" value={props.data.name} />
                        <TableRow label="Contact" value={props.data.contact} />
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export function UserCardParty(props: any) {
    const router = useRouter();

    const handleUpdate = async (party_id: string) => {
        localStorage.setItem('update_party', party_id);
        router.push('../pages/update_political_party');
    };

    return (
        <div className="card card-compact w-80 bg-yellow-200 bg-opacity-75 text-black carousel-item">
            <br />
            <div className="card-body">
                <h2 className="card-title justify-center">Party ID - {props.data.party_id}</h2>
                <table className="border-collapse w-full">
                    <tbody>
                        <TableRow label="Party Name" value={props.data.party_name} />
                        <TableRow label="Party Leader" value={props.data.party_leader} />
                        <TableRow label="Founding Date" value={props.data.founding_date} />
                        <TableRow label="Party Description" value={props.data.party_description} />
                    </tbody>
                </table>
                <div className="card-actions justify-end">
                    <button className="btn btn-warning" onClick={() => handleUpdate(props.data.party_id)}>Update</button>
                </div>
            </div>
        </div>
    );
}

export function UserCardCenters(props: any) {
    const router = useRouter();

    const delete_center = async (deleteCenter: number) => {
        const token = localStorage.getItem('token');

        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/sys_admin/delete_center`, {
                center_id: deleteCenter
            }, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: `Bearer ${token}`
                },
                withCredentials: true
            });

            toast.success('Center Deleted')
            window.location.reload();
        } catch (error) {
            console.error("Error:", error)
        }
    };

    const handleUpdate = async (center_id: string) => {
        localStorage.setItem('update_center', center_id);
        router.push('../pages/update_vote_center');
    };

    return (
        <div className="card card-compact w-80 bg-yellow-200 bg-opacity-75 text-black carousel-item">
            <Toaster />
            <br />
            <div className="card-body">
                <h2 className="card-title justify-center">Center ID - {props.data.center_id}</h2>
                <table className="border-collapse w-full">
                    <tbody>
                        <TableRow label="Center Name" value={props.data.center_name} />
                        <TableRow label="Election Location" value={props.data.election_location} />
                        <TableRow label="Emergency Contact" value={props.data.emergency_contact} />
                    </tbody>
                </table>
                <div className="card-actions justify-end">
                    <button className="btn btn-error" onClick={() => delete_center(props.data.center_id)}>Delete</button>
                    <button className="btn btn-warning" onClick={() => handleUpdate(props.data.center_id)}>Update</button>
                </div>
            </div>
        </div>
    );
}

export function UserCardProfile(props: any) {
    const router = useRouter();

    const handleUpdate = async () => {
        router.push('../pages/update_profile');
    };

    return (
        <div className="card card-compact w-80 bg-yellow-200 bg-opacity-75 text-black carousel-item">
            <br />
            <figure><img src={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/sys_admin/getimage/${props.data.image}`} alt="Profile Image" width="250" /></figure>
            <div className="card-body">
                <h2 className="card-title justify-center">Username - {props.data.username}</h2>
                <table className="border-collapse w-full">
                    <tbody>
                        <TableRow label="Name" value={props.data.name} />
                        <TableRow label="Address" value={props.data.address} />
                        <TableRow label="Contact" value={props.data.contact} />
                        <TableRow label="Email" value={props.data.email} />
                        <TableRow label="NID" value={props.data.nid} />
                        <TableRow label="Gender" value={props.data.gender} />
                        <TableRow label="Religion" value={props.data.religion} />
                    </tbody>
                </table>
                <div className="card-actions justify-end">
                    <button className="btn btn-warning" onClick={() => handleUpdate()}>Update</button>
                </div>
            </div>
        </div>
    );
}