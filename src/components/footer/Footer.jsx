import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

function Footer() {
  // Get the current year dynamically
  const currentYear = new Date().getFullYear();

  return (
    <footer className="text-gray-600 body-font bg-gray-300 fixed bottom-0 w-full">
      {/* Bottom section */}
      <div className="container px-5 py-3 mx-auto flex flex-col md:flex-row items-center justify-between">
        <div>
          <Link to="/" className="flex items-center justify-center">
            <h1 className="text-3xl font-bold text-black px-2 py-1 mt-4">HEKAWY</h1>
          </Link>
          <p className="text-sm text-gray-500">© {currentYear} HEKAWY —
            <a href="https://www.skillsuup.com/" className="text-gray-600 ml-1">skillsUp</a>
          </p>
        </div>
        <div className="flex mt-4 md:mt-0">
          {/* Social media icons */}
          <a href="#" className="text-gray-600 hover:text-gray-800 mx-2"><FaFacebook /></a>
          <a href="#" className="text-gray-600 hover:text-gray-800 mx-2"><FaTwitter /></a>
          <a href="#" className="text-gray-600 hover:text-gray-800 mx-2"><FaInstagram /></a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
