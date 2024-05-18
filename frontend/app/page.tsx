import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col h-screen" style={{ background: "linear-gradient(to bottom, rgb(13, 90, 44),rgb(25, 136, 98), white)" }}>
      <div className="flex-grow flex items-center">
        <div className="bg-green-1000 w-400 h-200 flex items-center justify-center">
          <Image src="/image3.jpg" alt="Voting Image" width={300} height={300} style={{ filter: "blur(1px)" }} />
        </div>
        <div className="content p-20">
          <h2 className="font-bold text-5xl">Welcome to Bangladesh Online Voting!</h2>
          <p className="text-lg">Vote for a better tomorrow</p>
          <div className="mt-4 space-x-4">
            <Link className="btn btn-outline btn-accent" href="/sign_in">Sign In</Link>
            <Link className="btn btn-outline btn-accent" href="/sign_up">Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
