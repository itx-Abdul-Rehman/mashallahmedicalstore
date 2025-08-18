import React from "react";
import { NavLink } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { 
  FaFacebookF, 
  FaInstagram, 
  FaTwitter, 
  FaLinkedinIn, 
  FaMapMarkerAlt, 
  FaPhoneAlt, 
  FaEnvelope 
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer id="contact" className="bg-green-600 text-white py-10 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Store Info */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Mashallah Medical Store</h2>
          <p className="flex items-center"><FaMapMarkerAlt className="mr-2 text-white" /> Chak 248-GB Malri, Gojra, Pakistan</p>
          <p className="flex items-center"><FaPhoneAlt className="mr-2 text-white" /> +92 344 3068267</p>
          <p className="flex items-center"><FaEnvelope className="mr-2 text-white" /> 248huzaifaanwar248@gmail.com</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <HashLink smooth to="/#home">
              <li className="hover:text-green-200 cursor-pointer transition-colors duration-200">Home</li>
            </HashLink>
            <NavLink to="/medicines">
              <li className="hover:text-green-200 cursor-pointer transition-colors duration-200">Medicines</li>
            </NavLink>
            <HashLink smooth to="/#about">
              <li className="hover:text-green-200 cursor-pointer transition-colors duration-200">About Us</li>
            </HashLink>
            <HashLink smooth to="/#contact">
              <li className="hover:text-green-200 cursor-pointer transition-colors duration-200">Contact</li>
            </HashLink>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebookF className="w-6 h-6 hover:text-green-200 cursor-pointer transition-colors duration-200" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="w-6 h-6 hover:text-green-200 cursor-pointer transition-colors duration-200" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="w-6 h-6 hover:text-green-200 cursor-pointer transition-colors duration-200" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedinIn className="w-6 h-6 hover:text-green-200 cursor-pointer transition-colors duration-200" />
            </a>
          </div>
        </div>

      </div>

      {/* Bottom */}
      <div className="mt-10 text-center text-gray-200 text-sm">
        &copy; {new Date().getFullYear()} Mashallah Medical Store. All rights reserved.
      </div>
    </footer>
  );
}
