import React, { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router";

const LoginPage = () => {
  const navigate = useNavigate();
  const { signInUser, signInGoogle } = useContext(AuthContext);

  // Local state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Handle Email/Password Login
  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }

    setLoading(true);

    signInUser(email, password)
      .then((result) => {
        console.log(result.user);
        toast.success("Login Successful!");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => setLoading(false));
  };

  // Handle Google Login
  const handleGoogle = (e) => {
    e.preventDefault();
    signInGoogle()
      .then(() => {
        toast.success("Google Login Successful!");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="min-h-screen py-24 flex items-center justify-center bg-gradient-to-b from-slate-100 to-slate-200 dark:from-gray-950 dark:to-gray-900 px-4">
      <div
        className="w-full max-w-md bg-gradient-to-br from-white/95 via-slate-50/90 to-blue-50/80
        dark:from-gray-900/90 dark:via-gray-800/80 dark:to-blue-900/30
        backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)]
        p-8 border border-white/20 dark:border-gray-700/40"
      >
        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
          Login to Your Account
        </h2>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleLogin}>
          {/* Email */}
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="mb-1 font-semibold text-gray-700 dark:text-gray-200 text-sm"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl px-4 py-2 border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col relative">
            <label
              htmlFor="password"
              className="mb-1 font-semibold text-gray-700 dark:text-gray-200 text-sm"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl px-4 py-2 border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-xs text-gray-500 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end text-sm">
            <Link
              to="#"
              onClick={(e) => e.preventDefault()}
              className="text-gray-400 cursor-not-allowed"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer py-2 mt-2 rounded-xl bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 font-semibold text-white shadow-lg hover:shadow-xl hover:scale-[1.02] transition-transform"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Google Sign-in */}
          <button
            type="button"
            onClick={handleGoogle}
            className="w-full cursor-pointer py-2 mt-3 bg-white text-black border border-gray-300 flex items-center justify-center gap-2 rounded-xl hover:bg-gray-100 transition-colors dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700"
          >
            <img
              src="https://developers.google.com/identity/images/g-logo.png"
              alt="Google"
              className="w-5 h-5"
            />
            Login with Google
          </button>
        </form>

        {/* Register Link */}
        <p className="mt-5 text-center text-gray-600 dark:text-gray-300 text-sm">
          Don’t have an account?{" "}
          <Link
            to="/registration"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
