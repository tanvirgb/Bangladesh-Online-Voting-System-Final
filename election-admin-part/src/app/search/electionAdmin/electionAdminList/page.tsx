"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Footer from "@/app/_components/Footer";
import Navbar from "@/app/_components/Navbar";

const ElectionAdminList = () => {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        setAdmins(response.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-10 p-5 bg-white shadow-lg rounded-lg">
        <h3 className="text-3xl font-bold mb-5 text-center text-blue-600">
          Election Admin List
        </h3>
        <ol className="space-y-4">
          {admins.map((item: any) => (
            <li
              key={item.id}
              className="p-4 bg-gray-100 hover:bg-gray-200 rounded-md transition duration-200"
            >
              <Link
                className="text-xl font-medium text-blue-500 hover:underline"
                href={`/search/electionAdmin/electionAdminList/${item.id}`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ol>
      </div>
      <Footer />
    </>
  );
};

export default ElectionAdminList;
