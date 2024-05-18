import Link from 'next/link';
// import { auth } from './auth';
// import { redirect } from 'next/navigation';

export default async function Home() {
  // const session = await auth();
  // if (!session) {
  //   redirect('/api/auth/signin');
  // }
  return (
    <div className="flex items-center justify-center min-h-screen min-w-full bg-slate-400 p-4">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome, Candidate </h1> {/*{session.user.name}*/}
        <p className="text-gray-600 mb-6">Role: </p> {/*{session.user.role}*/}
        <div className="flex justify-between items-center">
          <Link className="text-blue-500 hover:underline" href="/api/auth/signout">
            Sign out
          </Link>
        </div>
      </div>
    </div>
  );
}

