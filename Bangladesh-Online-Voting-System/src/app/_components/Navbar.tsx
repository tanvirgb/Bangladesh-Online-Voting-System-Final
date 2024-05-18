import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center px-4 py-2 bg-gradient-to-b from-green-500 to-red-600">
      <div className="flex items-center">
        <img
          className="h-16 w-16 rounded-full object-cover"
          src="../../../democrats-3594094_1920.jpg"
          alt="Logo"
        />
        <h1 className="ml-2 text-lg font-semibold text-white">
          Bangladesh Online Voting System
        </h1>
      </div>
      <ul className="flex space-x-4 text-lg font-semibold">
        <li>
          <Link
            href="/electionAdmin/dashboard"
            className="text-white hover:text-yellow-300 transition duration-300 ease-in-out"
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            href="/electionAdmin/profile"
            className="text-white hover:text-yellow-300 transition duration-300 ease-in-out"
          >
            My Profile
          </Link>
        </li>
        <li>
          <Link
            href="/search/electionAdmin/electionAdminList/"
            className="text-white hover:text-yellow-300 transition duration-300 ease-in-out"
          >
            View All Admins
          </Link>
        </li>
        <li>
          <Link
            href="/reportIssue"
            className="text-white hover:text-yellow-300 transition duration-300 ease-in-out"
          >
            Report Issue
          </Link>
        </li>
        <li>
          <Link
            href="/"
            className="text-white hover:text-yellow-300 transition duration-300 ease-in-out"
          >
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
