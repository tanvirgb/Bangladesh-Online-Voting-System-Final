import React from "react";
import Head from "next/head";

function AboutPage() {
  return (
    <>
     
      <div className="min-h-screen bg-neutral-400 flex flex-col justify-center items-center py-8">
        <Head>
          <title>About Online Voting System</title>
          <meta
            name="description"
            content="Learn about our online voting system."
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
            About Online Voting System
          </h1>
          <p className="text-lg text-gray-800 mb-8 leading-relaxed">
            Our online voting system is designed to provide a secure and
            convenient platform for conducting various types of elections and
            polls. Whether you are organizing a corporate election, a public
            referendum, or a simple survey, our platform offers the tools you
            need to manage the entire process efficiently.
          </p>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Key Features
          </h2>
          <ul className="list-disc pl-6 mb-8">
            <li className="text-lg text-gray-800 mb-2">
              Secure and tamper-proof voting process
            </li>
            <li className="text-lg text-gray-800 mb-2">
              Support for multiple types of elections and polls
            </li>
            <li className="text-lg text-gray-800 mb-2">
              Flexible configuration options
            </li>
            <li className="text-lg text-gray-800 mb-2">
              Real-time monitoring and reporting
            </li>
            <li className="text-lg text-gray-800 mb-2">
              Accessibility features for diverse user groups
            </li>
          </ul>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Our Mission
          </h2>
          <p className="text-lg text-gray-800 mb-8 leading-relaxed">
            Our mission is to democratize the voting process by providing an
            inclusive and transparent platform that empowers organizations and
            communities to make informed decisions through fair and efficient
            elections.
          </p>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Contact Us
          </h2>
          <p className="text-lg text-gray-800 leading-relaxed">
            If you have any questions or would like to learn more about our
            online voting system, please feel free to contact us at{" "}
            <a href="" className="text-blue-600 hover:underline"></a>. We look
            forward to hearing from you!
          </p>
        </main>
      </div>
     
    </>
  );
};

export default AboutPage;