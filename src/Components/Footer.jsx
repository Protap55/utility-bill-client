import React, { useContext } from "react";
import logo from "../assets/logo.png";
import { FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { SiX } from "react-icons/si";
import { NavLink } from "react-router";
import { AuthContext } from "../Context/AuthContext";

const Footer = () => {
  const { user } = useContext(AuthContext);

  const usefulLinks = user
    ? [
        { name: "Home", to: "/" },
        { name: "Bills", to: "/bills" },
        { name: "My Pay Bills", to: "/mypaybills" },
        { name: "FAQ", to: "/faq" },
        { name: "About", to: "/about" },
      ]
    : [
        { name: "Home", to: "/" },
        { name: "Bills", to: "/bills" },
        { name: "Login", to: "/login" },
        { name: "Register", to: "/registration" },
        { name: "FAQ", to: "/faq" },
        { name: "About", to: "/about" },
      ];

  return (
    <footer className="bg-white shadow-t-lg py-10 border-t border-gray-200 mt-0 mb-0">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
        {/* Logo & Description */}
        <div className="flex flex-col gap-4">
          <NavLink to="/" className="flex items-center gap-2">
            <img src={logo} alt="Logo" className="h-[50px] w-[65px]" />
            <span className="text-2xl font-bold text-[#155dfc]">
              Utility Bill Management System
            </span>
          </NavLink>
          <p className="text-gray-600">
            Simplifying your utility bill management. Track payments, stay
            organized, and never miss a due date.
          </p>

          {/* Social Links */}
          <div className="flex gap-3 mt-2">
            <a
              href="https://www.facebook.com/profile.php?id=61580337551457"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
            >
              <SiX />
            </a>
            <a
              href="https://www.linkedin.com/in/protap-dutta-web-developer/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-blue-800 text-white rounded-full hover:bg-blue-900 transition-colors"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors"
            >
              <FaInstagram />
            </a>
          </div>

          <p className="text-gray-500 text-sm mt-4">
            &copy; {new Date().getFullYear()} Utility Bill Management System.
            All rights reserved.
          </p>
        </div>

        <div className="md:col-span-2 flex flex-col md:flex-row justify-between gap-8">
          <div>
            <h3 className="text-lg font-semibold text-black mb-4">
              Useful Links
            </h3>
            <ul className="flex flex-col gap-2">
              {usefulLinks.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    className="text-gray-700 hover:text-[#155dfc] transition-colors"
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-black mb-4">Contact</h3>
            <p className="text-gray-600">Email: protapwith.dev@gmail.com</p>
            <p className="text-gray-600">Phone: +880 1234 567890</p>
            <p className="text-gray-600 mt-2">
              Address: Mirpur-2, Dhaka, Bangladesh
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
