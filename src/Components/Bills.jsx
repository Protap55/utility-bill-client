import React, { useEffect, useState } from "react";

const Bills = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://utility-bill-management-server-kappa.vercel.app/bills")
      .then((res) => res.json())
      .then((bills) => {
        setData(bills);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch bills:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-10">Loading bills...</p>;
  if (!data.length)
    return <p className="text-center mt-10">No bills available.</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-4xl font-extrabold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">
        Monthly Expense Overview
      </h2>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((bill, index) => (
          <div
            key={index}
            className="relative bg-white/80 backdrop-blur-lg border border-gray-200 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_rgba(79,70,229,0.15)] transition-all duration-300 ease-in-out transform hover:-translate-y-1"
          >
            <div className="overflow-hidden rounded-t-2xl">
              <img
                src={bill.image}
                alt={bill.title}
                className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="p-5">
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                {bill.title}
              </h3>
              <p className="text-sm text-indigo-500 font-medium mb-2">
                {bill.category}
              </p>
              <p className="text-gray-600 text-sm mb-3">{bill.description}</p>

              <div className="flex justify-between items-center mt-4">
                <span className="text-xl font-bold text-indigo-600">
                  ৳ {bill.amount}
                </span>
                <span className="text-sm text-gray-500">
                  {new Date(bill.date).toLocaleDateString()}
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-2">{bill.location}</p>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-b-2xl"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bills;
