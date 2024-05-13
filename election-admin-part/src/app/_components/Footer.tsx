import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 py-4 text-white text-center">
      <p className="text-sm">
        © {new Date().getFullYear()} Bangladesh Online Voting System. All rights
        reserved.
      </p>
    </footer>
  );
};

export default Footer;
