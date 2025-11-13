import React from "react";
import { FaEnvelope, FaLinkedin, FaGithub, FaGlobe } from "react-icons/fa";
import profilePic from "../assets/profile.png";

const AboutPage = () => {
  return (
    <div className="max-w-5xl mx-auto px-6  py-28  dark:bg-gray-900 transition-colors duration-500">
      <h1 className="text-5xl font-bold text-center mb-12 text-blue-500 dark:text-gray-100">
        About Me
      </h1>

      <div className="flex flex-col md:flex-row items-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-8 md:p-12 transition-all duration-300 hover:shadow-2xl">
        {/* Profile Image */}
        <div className="w-40 h-40 mb-6 md:mb-0 md:mr-8 flex-shrink-0">
          <img
            src={profilePic}
            alt="Protap Dutta"
            className="w-full h-full object-cover rounded-full border-4 border-blue-500 dark:border-blue-400 shadow-md"
          />
        </div>

        {/* Info Section */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-3xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
            Protap Dutta
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Hi! I am <strong>Protap Dutta</strong>, a passionate web developer
            who loves creating modern, responsive, and user-friendly web
            applications. My goal is to build interfaces that are not only
            functional but also visually appealing.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            This website is part of my projects showcasing web applications I
            have developed, including interactive bill management, FAQs, and
            other utilities.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            You can reach me via email or connect with me on professional
            platforms:
          </p>

          {/* Contact Links */}
          <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4 text-gray-700 dark:text-gray-300">
            <a
              href="mailto:protapwith.dev@gmail.com"
              className="flex items-center space-x-2 hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              <FaEnvelope /> <span>Email</span>
            </a>
            <a
              href="https://linkedin.com/in/protapdutta"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              <FaLinkedin /> <span>LinkedIn</span>
            </a>
            <a
              href="https://github.com/protapdutta"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              <FaGithub /> <span>GitHub</span>
            </a>
            <a
              href="https://protapwith.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              <FaGlobe /> <span>Website</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
