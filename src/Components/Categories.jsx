import React from "react";
import { FaBolt, FaGasPump, FaWater, FaWifi } from "react-icons/fa";

const categories = [
  {
    name: "Electricity",
    icon: <FaBolt className="text-yellow-200 text-4xl sm:text-5xl" />,
    color: "from-yellow-400 to-orange-500",
    desc: "Monitor usage and pay your power bills in just a few clicks.",
  },
  {
    name: "Gas",
    icon: <FaGasPump className="text-red-200 text-4xl sm:text-5xl" />,
    color: "from-red-400 to-pink-500",
    desc: "Stay updated and never miss a gas bill deadline again.",
  },
  {
    name: "Water",
    icon: <FaWater className="text-blue-200 text-4xl sm:text-5xl" />,
    color: "from-blue-400 to-cyan-500",
    desc: "Track your water bills effortlessly and pay securely online.",
  },
  {
    name: "Internet",
    icon: <FaWifi className="text-green-200 text-4xl sm:text-5xl" />,
    color: "from-green-400 to-emerald-500",
    desc: "Keep your connection active with easy online bill payments.",
  },
];

const Categories = () => {
  return (
    <section className="py-12 sm:py-16  dark:from-gray-900 dark:to-gray-800">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10 sm:mb-12 text-[#155dfc] dark:text-white">
        Our Utility Categories
      </h2>

      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 max-w-6xl mx-auto px-4 sm:px-6">
        {categories.map((cat, index) => (
          <div
            key={index}
            className={`rounded-3xl shadow-xl p-6 sm:p-8 flex flex-col items-center justify-center text-center 
              bg-gradient-to-br ${cat.color} text-white transition-all duration-300 hover:scale-105 cursor-pointer`}
          >
            <div className="mb-3 sm:mb-4">{cat.icon}</div>
            <h3 className="text-xl sm:text-2xl font-semibold mb-2">
              {cat.name}
            </h3>
            <p className="text-xs sm:text-sm opacity-90 font-medium">
              {cat.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
