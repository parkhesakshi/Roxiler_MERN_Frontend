import React from "react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-500 to-teal-500 text-white text-center py-6 shadow-lg">
      <div className=" container mx-auto">
        <div className="flex justify-center space-x-4 mb-4">
          <a
            href="https://github.com/parkhesakshi"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-200"
          >
            <FaGithub size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/sakshiparkhe/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-200"
          >
            <FaLinkedin size={24} />
          </a>
          <a
            href="https://www.instagram.com/sakshiparkhe0108/#"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-200"
          >
            <FaInstagram size={24} />
          </a>
        </div>
        <p>
          <strong>
            &copy; {new Date().getFullYear()} Sakshi Parkhe. All rights
          </strong>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
