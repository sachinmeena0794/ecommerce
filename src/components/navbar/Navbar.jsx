import React, { Fragment, useContext, useState } from 'react';
import { FiSun, FiMenu, FiShoppingCart } from 'react-icons/fi';
import myContext from '../../context/data/myContext';
import { Link } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';
import { RxCross2 } from 'react-icons/rx';
import { useSelector } from 'react-redux';
import SideMenu from './SideMenu';

function Navbar() {
  const context = useContext(myContext);
  const { mode, toggleMode } = context;

  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to track if the menu is open

  const user = JSON.parse(localStorage.getItem('user'));

  const logout = () => {
    localStorage.clear('user');
    window.location.href = '/login';
  };

  const cartItems = useSelector((state) => state.cart);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle the menu state
  };

  return (
    <div className='bg-white sticky top-0 z-50'>
      <header className="relative bg-white">
        <nav aria-label="Top" className="bg-gray-100 px-4 sm:px-6 lg:px-8 shadow-xl">
          <div className="flex justify-between h-16 items-center">
            <div className="ml-4 flex lg:ml-0">
              {/* Menu Icon */}
              <button onClick={toggleMenu} className="text-sm font-medium text-gray-700 mr-4 focus:outline-none">
                <FiMenu className="w-6 h-6" />
              </button>
              {/* Title */}
              <Link to={'/'} className='flex'>
                <div className="flex">
                  <h1 className=' text-2xl font-bold text-black  px-2 py-1 rounded'>HEKAWY</h1>
                </div>
              </Link>
            </div>

            <div className="mr-4 flex items-center">
              {/* Cart */}
              <Link to={'/cart'} className="group -m-2 flex items-center p-2">
                <FiShoppingCart className="w-6 h-6 mr-2" />
                <span className="text-sm font-medium text-gray-700 group">{cartItems.length}</span>
              </Link>
            </div>
          </div>
        </nav>
      </header>
      {isMenuOpen && <SideMenu onClose={toggleMenu} user={user} logout={logout} />} {/* Render the side menu when isMenuOpen is true */}
    </div>
  )
}

export default Navbar;
