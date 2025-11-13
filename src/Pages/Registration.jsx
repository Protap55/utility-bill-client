import React, { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { updateProfile } from "firebase/auth";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { createUser, signInGoogle } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photo: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // Password Validation
  const validatePassword = (password) => {
    if (password.length < 6)
      return "Password must be at least 6 characters long";
    if (!/[A-Z]/.test(password))
      return "Password must contain at least one uppercase letter";
    if (!/[a-z]/.test(password))
      return "Password must contain at least one lowercase letter";
    return "";
  };

  // Register with Email + Password
  const handleEmailPassAuth = (e) => {
    e.preventDefault();
    const { name, email, password, photo } = formData;

    if (!name || !email || !password || !photo) {
      toast.error("Please fill all fields");
      return;
    }

    const validationMsg = validatePassword(password);
    if (validationMsg) {
      setPasswordError(validationMsg);
      toast.error(validationMsg);
      return;
    }

    setPasswordError("");

    createUser(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, { displayName: name, photoURL: photo });
        toast.success("Registration Successful!");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  // Google Sign In
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
    <div className="min-h-screen py-24 flex items-center justify-center bg-gradient-to-b from-slate-100 to-slate-200 dark:from-gray-900 dark:to-gray-800 px-4 sm:px-6 lg:px-8 py-16">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-3xl shadow-2xl p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
          Create an Account
        </h2>

        <form className="space-y-4" onSubmit={handleEmailPassAuth}>
          {/* Name */}
          <div className="flex flex-col">
            <label
              htmlFor="name"
              className="mb-1 font-semibold text-gray-700 dark:text-gray-200 text-sm sm:text-base"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-xl px-4 py-2 text-sm sm:text-base border focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="mb-1 font-semibold text-gray-700 dark:text-gray-200 text-sm sm:text-base"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-xl px-4 py-2 text-sm sm:text-base border focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Photo URL */}
          <div className="flex flex-col">
            <label
              htmlFor="photo"
              className="mb-1 font-semibold text-gray-700 dark:text-gray-200 text-sm sm:text-base"
            >
              Photo URL
            </label>
            <input
              type="text"
              id="photo"
              placeholder="Profile Photo URL"
              value={formData.photo}
              onChange={handleChange}
              className="w-full rounded-xl px-4 py-2 text-sm sm:text-base border focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col relative">
            <label
              htmlFor="password"
              className="mb-1 font-semibold text-gray-700 dark:text-gray-200 text-sm sm:text-base"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full rounded-xl px-4 py-2 text-sm sm:text-base border focus:outline-none focus:ring-2 ${
                passwordError
                  ? "focus:ring-red-400 border-red-400"
                  : "focus:ring-blue-400"
              } dark:bg-gray-700 dark:text-white`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-xs sm:text-sm text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
            >
              {showPassword ? "Hide" : "Show"}
            </button>

            {passwordError && (
              <p className="text-xs sm:text-sm text-red-500 mt-1">
                {passwordError}
              </p>
            )}
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full cursor-pointer py-2 sm:py-3 mt-4 rounded-xl bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 font-semibold text-white shadow-lg hover:scale-105 transition-transform text-sm sm:text-base"
          >
            Register
          </button>

          {/* Google Sign-in */}
          <button
            onClick={handleGoogle}
            type="button"
            className="w-full cursor-pointer py-2 sm:py-3 text-sm sm:text-base bg-white text-black border border-gray-300 flex items-center justify-center gap-2 mt-3 rounded-xl hover:bg-gray-100 transition-colors dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600"
          >
            <img
              src="https://developers.google.com/identity/images/g-logo.png"
              alt="Google"
              className="w-5 h-5"
            />
            Sign up with Google
          </button>
        </form>

        {/* Login Link */}
        <p className="mt-5 text-center text-gray-600 dark:text-gray-300 text-xs sm:text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
