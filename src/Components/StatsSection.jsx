import React from "react";

const stats = [
  {
    title: "We Process and Pay",
    value: "50M",
    description: "invoices each year",
  },
  {
    title: "Every Year We Pay",
    value: ">150",
    description: "types of payables to 40,000 different vendors",
  },
  {
    title: "Every Year We Handle",
    value: ">$90B",
    description: "in annual disbursements, managed by 1,100 employees globally",
  },
];

const StatsSection = () => {
  return (
    <section className="relative py-24 bg-gradient-to-r from-blue-950 via-indigo-900 to-purple-950 overflow-hidden">
      {/* Modern abstract shapes */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-pink-500 opacity-30 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-cyan-400 opacity-30 rounded-full blur-3xl animate-pulse-slow"></div>

      <div className="relative max-w-7xl mx-auto px-6 text-white">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-teal-400 drop-shadow-lg">
          A Processing & Payment Powerhouse
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white bg-opacity-20 backdrop-blur-lg p-8 rounded-3xl shadow-xl flex flex-col items-center text-center transition transform hover:scale-105 hover:bg-opacity-30 duration-500"
            >
              <h3 className="text-lg font-semibold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400 drop-shadow-md">
                {stat.title}
              </h3>
              <p className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-400 drop-shadow-lg">
                {stat.value}
              </p>
              <p className="text-sm sm:text-base text-black font-semibold">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
