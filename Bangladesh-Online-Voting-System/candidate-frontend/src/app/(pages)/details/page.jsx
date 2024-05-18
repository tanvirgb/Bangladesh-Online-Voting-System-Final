import React from 'react';

function DetailsPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <header className="bg-blue-600 text-white py-6 px-8">
          <h1 className="text-3xl font-bold">Details Page</h1>
        </header>
        <main className="p-8">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Candidate Information</h2>
            <p className="text-gray-700 leading-relaxed">
              
            </p>
          </section>
          <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-3">Personal Information</h3>
              <p className="text-gray-600">Name: Alif Hasan<br/>
              Address: Home#01, Bangladesh <br/> Gender: Male</p>
              <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300">
                Full Details
              </button>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-3">Voting Center</h3>
              <p className="text-gray-600">Center Name: First Center<br/> Center ID: 01234, Center Location: Home#02, Bangladesh</p>
              <button className="mt-4 px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition duration-300">
                View other voting centers
              </button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default DetailsPage;
