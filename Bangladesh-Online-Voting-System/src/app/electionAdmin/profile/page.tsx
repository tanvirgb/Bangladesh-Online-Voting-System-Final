import Footer from "@/app/_components/Footer";
import Navbar from "@/app/_components/Navbar";
import Link from "next/link";

const Profile = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <div className="flex items-center justify-center">
            <img
              className="w-24 h-24 rounded-full shadow-lg"
              src="../blank-profile-picture-973460_1920.png"
              alt="Profile Picture"
            />
          </div>
          <div className="mt-4 text-center">
            <h2 className="text-xl font-semibold">Election Admin</h2>
          </div>
          <div className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200 text-center">
            <Link href="/electionAdmin/profile/profileDetails">
              View Profile
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
