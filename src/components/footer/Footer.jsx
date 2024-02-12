import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

function Footer() {
  // Get the current year dynamically
  const currentYear = new Date().getFullYear();

  return (
<footer className="text-gray-600 body-font bg-gray-300 fixed bottom-0 w-full" style={{ maxHeight: '60px', overflow: 'hidden' }}>
  {/* Bottom section */}
  <div className="container px-5 mx-auto flex flex-col md:flex-row items-center justify-between">
    <div className='flex items-center'>
      <Link to="/" className="flex items-center justify-center">
        <h1 className="text-lg md:text-3xl font-bold text-black px-2 mt-2 md:mt-4">HEKAWY</h1>
      </Link>
      <a href="https://www.skillsuup.com/" className="text-gray-600 ml-1 text-xs md:text-sm self-center">© {currentYear} HEKAWY</a>
      <div className="flex md:mt-0">
      {/* Social media icons */}
      <a href="#" className="text-gray-600 hover:text-gray-800 mx-1 md:mx-2"><FaFacebook /></a>
      <a href="#" className="text-gray-600 hover:text-gray-800 mx-1 md:mx-2"><FaInstagram /></a>
    </div>
    </div>
    
  </div>
</footer>


  );
}

export default Footer;
