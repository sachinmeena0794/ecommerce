import React, { Fragment, useContext, useState } from "react";
import { FiMenu, FiShoppingCart, FiLogIn } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SideMenu from "./SideMenu";
import { getAuth } from 'firebase/auth';


function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to track if the menu is open

  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const logout = async () => {
    try {
      await getAuth().signOut(); // Call the signOut method to log the user out
      localStorage.clear("user");
      navigate("/login"); // Optional: You can also redirect the user to the login page or perform other actions after logout
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  
  };

  const cartItems = useSelector((state) => state.cart);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle the menu state
  };

  return (
    <div className="bg-white sticky top-0 z-50">
      <header className="relative bg-white">
        <nav
          aria-label="Top"
          className="bg-gray-100 px-4 sm:px-6 lg:px-8 shadow-xl"
        >
          <div className="flex justify-between h-16 items-center">
            <div className="ml-4 flex lg:ml-0">
              {/* Menu Icon */}
              {user && (
                <button
                  onClick={toggleMenu}
                  className="text-sm font-medium text-gray-700 mr-4 focus:outline-none"
                >
                  <FiMenu className="w-6 h-6" />
                </button>
              )}
              {/* Title */}
              <Link to={"/"} className="flex">
                <div className="flex">
                  <h1 className=" text-2xl font-bold text-black  px-2 py-1 rounded">
                    HEKAWY
                  </h1>

                  {/* Cart */}
                  {!user && (
                    <Link
                      to={"/login"}
                      className="group -m-2 flex items-center p-2"
                    >
                      <FiLogIn className="w-6 h-6 mr-2" />
                    </Link>
                  )}
                </div>
              </Link>
            </div>

            <div className="mr-4 flex items-center">
              {/* Cart */}
              {user && (
       <Link to={"/cart"} className="group -m-2 flex items-center p-2">
       <FiShoppingCart className="w-6 h-6 mr-2" />
       <span className="text-sm font-medium text-gray-700 group">
         {cartItems.reduce((totalQuantity, item) => totalQuantity + item.quantity, 0)}
       </span>
     </Link>
     
        
              )}
            </div>
          </div>
        </nav>
      </header>
      {isMenuOpen && (
        <SideMenu onClose={toggleMenu} user={user} logout={logout} />
      )}{" "}
      {/* Render the side menu when isMenuOpen is true */}
    </div>
  );
}

export default Navbar;
