import React, { useState } from "react";
import { NavLink } from 'react-router-dom';
import { HashLink } from "react-router-hash-link";
import { FiShoppingCart } from "react-icons/fi";
import { useSelector } from "react-redux";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const cartItems = useSelector((state) => state.cartItem.value);

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">

                {/* Brand Name */}
                <h1 className="text-2xl font-bold bg-gradient-to-r from-green-500 to-teal-500 text-transparent bg-clip-text cursor-pointer hover:scale-105 transition-transform duration-300">
                    Mashallah Medical Store
                </h1>

                {/* Desktop Navigation Links */}
                <ul className="hidden md:flex space-x-8 text-gray-700 font-medium">
                    <HashLink smooth to="/#home">
                        <li className="hover:text-green-500 cursor-pointer transition-colors duration-200">Home</li>
                    </HashLink>
                    <NavLink to="/medicines">
                        <li className="hover:text-green-500 cursor-pointer transition-colors duration-200">Medicines</li>
                    </NavLink>
                    <HashLink smooth to="/#about">
                        <li className="hover:text-green-500 cursor-pointer transition-colors duration-200">About Us</li>
                    </HashLink>
                    <HashLink smooth to="/#contact">
                        <li className="hover:text-green-500 cursor-pointer transition-colors duration-200">Contact</li>
                    </HashLink>

                    {/* Cart Icon */}
                    <NavLink to="/cart">
                        <li className="relative cursor-pointer">
                            <FiShoppingCart className="text-2xl hover:text-green-500 transition-colors duration-200" />
                            {cartItems.length > 0 &&
                                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full px-1">
                                    {cartItems.length}
                                </span>
                            }
                        </li>
                    </NavLink>
                </ul>

                {/* Mobile Hamburger Icon */}
                <button
                    className="md:hidden text-gray-700 focus:outline-none"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? "✖" : "☰"}
                </button>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden bg-white shadow-md border-t border-gray-200">
                    <ul className="flex flex-col space-y-4 p-4 text-gray-700 font-medium">
                        <HashLink smooth to="/#home">
                            <li className="hover:text-green-500 cursor-pointer transition-colors duration-200">Home</li>
                        </HashLink>
                        <NavLink to="/medicines">
                            <li className="hover:text-green-500 cursor-pointer transition-colors duration-200">Medicines</li>
                        </NavLink>
                        <HashLink smooth to="/#about">
                            <li className="hover:text-green-500 cursor-pointer transition-colors duration-200">About Us</li>
                        </HashLink>
                        <HashLink smooth to="/#contact">
                            <li className="hover:text-green-500 cursor-pointer transition-colors duration-200">Contact</li>
                        </HashLink>

                        {/* Cart in mobile */}
                        <NavLink to="/cart">
                            <li className="flex items-center space-x-2 hover:text-green-500 cursor-pointer transition-colors duration-200">
                                <FiShoppingCart className="text-xl" />
                                <span>Cart</span>
                            </li>
                        </NavLink>
                    </ul>
                </div>
            )}
        </nav>
    );
}
