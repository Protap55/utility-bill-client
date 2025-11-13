import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const RecentBills = () => {
  const [bills, setBills] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://utility-bill-management-server-kappa.vercel.app/all-bills")
      .then((res) => res.json())
      .then((data) => setBills(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-14">
      <h2 className="text-4xl font-bold text-center mb-10 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
        Recent Bills
      </h2>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {bills.map((bill) => (
          <div
            key={bill._id}
            className="bg-gradient-to-b from-white to-indigo-50 rounded-2xl shadow-md hover:shadow-2xl border border-indigo-100 transition-all duration-300 transform hover:-translate-y-2 hover:scale-[1.02] p-6"
          >
            <div className="flex flex-col h-full justify-between">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-1">
                  {bill.title}
                </h3>
                <p className="text-sm text-indigo-600 font-medium mb-2">
                  {bill.category}
                </p>
                <p className="text-gray-500 mb-1">{bill.location}</p>
                <p className="text-gray-400 text-sm mb-4">
                  {new Date(bill.date).toLocaleDateString()}
                </p>
              </div>

              <button
                onClick={() => navigate(`/all-bills/${bill._id}`)}
                className="w-full cursor-pointer bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2.5 rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transition-all"
              >
                See Details
              </button>
            </div>

            <div className="mt-4 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentBills;
