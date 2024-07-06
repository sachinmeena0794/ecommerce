import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";

function SideMenu({ onClose, user, logout }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-25">
      <div className="fixed inset-y-0 left-0 max-w-xs w-full text-white z-50">
        <div className="bg-gray-800 flex flex-col h-full justify-between">
          <div className="p-6">
            <button
              onClick={onClose}
              className="absolute top-0 right-0 mt-4 mr-4 focus:outline-none text-white text-4xl"
              style={{ transition: "font-size 0.3s ease" }}
            >
              <AiOutlineClose className="w-6 h-6" />
            </button>

            <div className="mt-32">
              <Link
                to={"/shop"}
                onClick={onClose}
                className="block mb-8 text-gray-300 menu-item text-3xl transition-all duration-300 hover:text-white hover:text-4xl"
              >
                Shop
              </Link>
              <Link
                to={"/look"}
                onClick={onClose}
                className="block mb-8 text-gray-300 menu-item text-3xl transition-all duration-300 hover:text-white hover:text-4xl"
              >
                Looks
              </Link>
              
              {user ? (
                <Link
                  to={"/order"}
                  onClick={onClose}
                  className="block mb-8 text-gray-300 menu-item text-3xl transition-all duration-300 hover:text-white hover:text-4xl"
                >
                  Order
                </Link>
              ) : (
                <Link
                  to={"/signup"}
                  onClick={onClose}
                  className="block mb-8 text-gray-300 menu-item text-3xl transition-all duration-300 hover:text-white hover:text-4xl"
                >
                  Signup
                </Link>
              )}
              
              {user?.email === "skillsuup@gmail.com" && (
                <Link
                  to={"/dashboard"}
                  onClick={onClose}
                  className="block mb-8 text-gray-300 menu-item text-3xl transition-all duration-300 hover:text-white hover:text-4xl"
                >
                  Admin
                </Link>
              )}
                <Link
                to={"/about"}
                onClick={onClose}
                className="block mb-8 text-gray-300 menu-item text-3xl transition-all duration-300 hover:text-white hover:text-4xl"
              >
                About
              </Link>
              {user && (
                <button
                  onClick={logout}
                  className="block mb-8 text-gray-300 text-3xl transition-all duration-300 hover:text-white hover:text-4xl"
                >
                  LOGOUT
                </button>
              )}
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideMenu;
