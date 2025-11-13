import React, { useContext, useState, useEffect } from "react";
import { NavLink } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { FaSun, FaMoon } from "react-icons/fa";
import logo from "../assets/logo.png";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") setDarkMode(true);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const links = [
    { name: "Home", to: "/" },
    { name: "Bills", to: "/bills" },
    { name: "FAQ", to: "/faq" },
    { name: "About", to: "/about" },
  ];

  const handleLogout = async () => {
    try {
      await signOutUser();
    } catch (err) {
      console.error(err);
    }
  };

  const avatar = user?.photoURL || "/default-avatar.png";

  const navLinkClassDesktop = ({ isActive }) =>
    `px-3 py-2 rounded-md font-semibold transition-all duration-300 ${
      isActive
        ? "bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white"
        : "text-black dark:text-white hover:bg-blue-100 dark:hover:bg-gray-700"
    }`;

  const navLinkClassMobile = ({ isActive }) =>
    `block px-4 py-2 rounded-md font-semibold transition-all duration-300 ${
      isActive
        ? "bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white"
        : "bg-transparent text-black dark:text-white hover:bg-blue-100 dark:hover:bg-gray-700"
    }`;

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: "auto", transition: { duration: 0.3 } },
    exit: { opacity: 0, height: 0, transition: { duration: 0.2 } },
  };

  return (
    <motion.nav
      variants={navVariants}
      initial="hidden"
      animate="visible"
      className={`fixed top-0 left-0 w-full z-50 px-6 py-3 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-md bg-white/80 dark:bg-gray-900/80 shadow-lg"
          : "bg-white dark:bg-gray-900 shadow-md"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2">
          <motion.img
            className="h-12 w-16 sm:h-14 sm:w-20"
            src={logo}
            alt="Logo"
            whileHover={{ scale: 1.1 }}
          />
          <span className="text-lg sm:text-2xl font-bold text-[#155dfc] dark:text-white">
            Utility Bill Management System
          </span>
        </NavLink>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center space-x-4">
          {links.map((link, index) => (
            <motion.div
              key={link.to}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <NavLink to={link.to} className={navLinkClassDesktop}>
                {link.name}
              </NavLink>
            </motion.div>
          ))}

          {user ? (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <NavLink to="/mypaybills" className={navLinkClassDesktop}>
                  My Pay Bills
                </NavLink>
              </motion.div>
              <motion.img
                src={avatar}
                alt="avatar"
                className="w-8 h-8 rounded-full border border-gray-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              />
              <motion.button
                onClick={handleLogout}
                className="px-3 py-2 rounded-md bg-red-500 text-white hover:bg-red-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Logout
              </motion.button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={navLinkClassDesktop}>
                Login
              </NavLink>
              <NavLink to="/registration" className={navLinkClassDesktop}>
                Register
              </NavLink>
            </>
          )}

          {/* Dark/Light Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-md bg-gray-200 dark:bg-gray-800 text-black dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 transition-all duration-300 flex items-center justify-center"
          >
            {darkMode ? (
              <FaSun className="text-yellow-400" />
            ) : (
              <FaMoon className="text-blue-600" />
            )}
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-black dark:text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-md bg-gray-200 dark:bg-gray-800 text-black dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 transition-all duration-300 flex items-center justify-center"
          >
            {darkMode ? (
              <FaSun className="text-yellow-400" />
            ) : (
              <FaMoon className="text-blue-600" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="lg:hidden mt-2 space-y-2 p-4 bg-white dark:bg-gray-900 shadow-lg rounded-md overflow-hidden"
          >
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={navLinkClassMobile}
              >
                {link.name}
              </NavLink>
            ))}

            {user ? (
              <>
                <NavLink
                  to="/mypaybills"
                  onClick={() => setMenuOpen(false)}
                  className={navLinkClassMobile}
                >
                  My Pay Bills
                </NavLink>
                <img
                  src={avatar}
                  alt="avatar"
                  className="w-8 h-8 rounded-full border border-gray-300 mx-auto"
                />
                <button
                  onClick={handleLogout}
                  className="w-full py-2 mt-2 rounded-md bg-red-500 text-white hover:bg-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className={navLinkClassMobile}
                >
                  Login
                </NavLink>
                <NavLink
                  to="/registration"
                  onClick={() => setMenuOpen(false)}
                  className={navLinkClassMobile}
                >
                  Register
                </NavLink>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
