import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  // Get the current year dynamically
  const currentYear = new Date().getFullYear();

  return (
    <div>
      <footer className="text-gray-600 body-font bg-gray-300">
      <div className="container px-5 py-24 mx-auto">
  <div className="flex flex-wrap md:text-left text-center items-center justify-between">
    {/* HEKAWY Logo */}
    <div className="lg:w-auto md:w-1/2 w-full px-4">
      <Link to="/" className="flex items-center justify-center">
        <h1 className="text-3xl font-bold text-black px-2 py-1">HEKAWY</h1>
      </Link>
    </div>

    {/* Other sections */}
    <div className="lg:w-1/4 md:w-1/2 w-full px-4">
      <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">CATEGORIES</h2>
      <nav className="list-none mb-10">
        <li>
          <Link to="/allproducts" className="text-gray-600 hover:text-gray-800">All Products</Link>
        </li>
        <li>
          <Link to="/order" className="text-gray-600 hover:text-gray-800">Order</Link>
        </li>
        <li>
          <Link to="/cart" className="text-gray-600 hover:text-gray-800">Cart</Link>
        </li>
      </nav>
    </div>
  </div>
</div>


        {/* Bottom section */}
        <div className="bg-gray-200">
          <div className="container px-5 py-3 mx-auto flex items-center justify-between">
            <p className="text-sm text-gray-500">© {currentYear} HEKAWY —
              <a href="https://www.skillsuup.com/" className="text-gray-600 ml-1">skillsUp</a>
            </p>
            {/* Social media icons */}
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
