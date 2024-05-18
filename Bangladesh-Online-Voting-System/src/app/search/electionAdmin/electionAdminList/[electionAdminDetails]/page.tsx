import Footer from "@/app/_components/Footer";
import Navbar from "@/app/_components/Navbar";
import axios from "axios";

export default async function ElectionAdminDetails({
  params,
}: {
  params: { electionAdminDetails: string };
}) {
  const fetchData = await axios.get(
    `https://jsonplaceholder.typicode.com/users/${params.electionAdminDetails}`
  );
  const res = await fetchData.data;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
        <h3 className="text-3xl font-bold mb-5 text-center text-blue-600">
          Election Admin Details
        </h3>
        <div className="p-4 bg-gray-100 rounded-md">
          <p className="text-xl font-semibold mb-2">
            <span className="font-bold text-gray-700">ID:</span> {res.id}
          </p>
          <p className="text-xl font-semibold mb-2">
            <span className="font-bold text-gray-700">Name:</span> {res.name}
          </p>
          <p className="text-xl font-semibold mb-2">
            <span className="font-bold text-gray-700">Email:</span> {res.email}
          </p>
          <p className="text-xl font-semibold mb-2">
            <span className="font-bold text-gray-700">Phone:</span> {res.phone}
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
