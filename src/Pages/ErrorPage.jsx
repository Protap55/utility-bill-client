import React from "react";
import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white">
      <h1 className="text-9xl font-bold mb-4 animate-pulse">404</h1>
      <h2 className="text-3xl mb-6">Oops! Page Not Found</h2>
      <p className="mb-6 text-center max-w-md">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg shadow-lg hover:bg-purple-100 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default ErrorPage;
