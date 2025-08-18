import React from "react";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import { NavLink } from "react-router-dom";
import { NavHashLink } from "react-router-hash-link";
export default function Footer() {
  return (
    <footer id="contact" className="bg-green-600 text-white py-10 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Store Info */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Mashallah Medical Store</h2>
          <p>📍 Chak 248-GB Malri, Gojra, Pakistan</p>
          <p>📞 +92 344 3068267</p>
          <p>✉ info@mashallahmedical.com</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <NavHashLink smooth to='/#home'>
              <li className="hover:text-green-200 cursor-pointer transition-colors duration-200">Home</li>
            </NavHashLink>
            <NavLink smooth to='/medicines'>
              <li className="hover:text-green-200 cursor-pointer transition-colors duration-200">Medicines</li>
            </NavLink>
            <NavHashLink smooth to='/#about'>
              <li className="hover:text-green-200 cursor-pointer transition-colors duration-200">About Us</li>
            </NavHashLink>
            <NavHashLink smooth to='/#contact'>
              <li className="hover:text-green-200 cursor-pointer transition-colors duration-200">Contact</li>
            </NavHashLink>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <Facebook className="w-6 h-6 hover:text-green-200 cursor-pointer transition-colors duration-200" />
            <Instagram className="w-6 h-6 hover:text-green-200 cursor-pointer transition-colors duration-200" />
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
