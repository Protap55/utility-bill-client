import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const BillsPage = () => {
  const [bills, setBills] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();

  const fetchBills = async (category = "") => {
    try {
      let url =
        "https://utility-bill-management-server-kappa.vercel.app/total-bills";
      if (category) url += `?category=${encodeURIComponent(category)}`;

      const res = await fetch(url);
      const data = await res.json();
      setBills(data);

      const cats = [...new Set(data.map((bill) => bill.category))];
      setCategories(cats);
    } catch (err) {
      console.error("Failed to fetch bills:", err);
    }
  };

  useEffect(() => {
    fetchBills();
  }, []);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    fetchBills(e.target.value);
  };

  return (
    <div className="container mx-auto px-4 py-28">
      <h1 className="text-3xl font-bold mb-8 text-center text-[#3171fc] dark:text-blue-400">
        All Bills
      </h1>

      {/* Category Filter */}
      <div className="mb-8 flex justify-end">
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="p-3 border rounded-lg bg-white dark:bg-gray-800 dark:text-white dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option
            value=""
            className="bg-white text-gray-800 dark:bg-white dark:text-gray-800"
          >
            All Categories
          </option>
          {categories.map((cat) => (
            <option
              key={cat}
              value={cat}
              className="bg-white text-gray-800 dark:bg-gray-800 dark:text-white"
            >
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Bills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {bills.map((bill) => (
          <div
            key={bill._id}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <img
              src={bill.image}
              alt={bill.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-5">
              <h2 className="text-xl font-bold mb-1 text-gray-800 dark:text-gray-100">
                {bill.title}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                <strong>Category:</strong> {bill.category}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                <strong>Location:</strong> {bill.location}
              </p>
              <p className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
                ${bill.amount}
              </p>
              <button
                onClick={() => navigate(`/total-bills/${bill._id}`)}
                className="w-full cursor-pointer bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2.5 rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transition-all"
              >
                See Details
              </button>
            </div>

            {/* Accent line at bottom */}
            <div className="h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BillsPage;
