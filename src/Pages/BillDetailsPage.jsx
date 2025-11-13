import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import PayBillModal from "../Components/PayBillModal";

const BillDetailsPage = ({ user }) => {
  const { id } = useParams();
  const [bill, setBill] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    fetch(
      `https://utility-bill-management-server-kappa.vercel.app/all-bills/${id}`
    )
      .then((res) => res.json())
      .then((data) => setBill(data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!bill) return <p className="text-center mt-10">Loading...</p>;

  const billDate = new Date(bill.date);
  const now = new Date();
  const isCurrentMonth =
    billDate.getMonth() === now.getMonth() &&
    billDate.getFullYear() === now.getFullYear();

  return (
    <div className="max-w-4xl mx-auto px-6 py-24">
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
          <h1 className="text-3xl font-bold">{bill.title}</h1>
        </div>

        {/* Image */}
        {bill.image && (
          <img
            src={bill.image}
            alt={bill.title}
            className="w-full h-64 object-cover"
          />
        )}

        {/* Bill Details */}
        <div className="p-6 space-y-3 text-gray-700 dark:text-gray-300">
          <p>
            <strong>Category:</strong> {bill.category}
          </p>
          <p>
            <strong>Location:</strong> {bill.location}
          </p>
          <p>
            <strong>Description:</strong> {bill.description}
          </p>
          <p>
            <strong>Amount:</strong> ${bill.amount}
          </p>
          <p>
            <strong>Date:</strong> {billDate.toLocaleDateString()}
          </p>

          {/* Pay Bill Button */}
          <button
            onClick={() => setModalIsOpen(true)}
            disabled={!isCurrentMonth}
            className={`mt-4 px-6 py-2 rounded-lg text-white transition ${
              isCurrentMonth
                ? "bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            {isCurrentMonth
              ? "Pay Bill"
              : "Only current month bills can be paid"}
          </button>
        </div>
      </div>

      {/* Reusable Modal */}
      {modalIsOpen && (
        <PayBillModal
          isOpen={modalIsOpen}
          onClose={() => setModalIsOpen(false)}
          bill={bill}
          user={user}
        />
      )}
    </div>
  );
};

export default BillDetailsPage;
