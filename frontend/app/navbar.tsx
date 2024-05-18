import Link from "next/link";

export default function NavBar() {
    return (
        <>
        <b>Contents</b> <br></br>
        <Link href="/homepage">About</Link> <br></br>
        <Link href="/sign_in">Sign In</Link> <br></br>
        <Link href="/sign_up">Sign Up</Link> <br></br>
        </>
        
    );
}