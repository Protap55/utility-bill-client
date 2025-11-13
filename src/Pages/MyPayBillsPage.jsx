import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { toast } from "react-toastify";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "react-data-grid/lib/styles.css";

const MyPayBillsPage = () => {
  const { user } = useContext(AuthContext);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const fetchPayments = () => {
    if (!user?.email) return;
    fetch(
      `https://utility-bill-management-server-kappa.vercel.app/payments?email=${user.email}`
    )
      .then((res) => res.json())
      .then((data) => {
        setPayments(data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load your payments!");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPayments();
  }, [user?.email]);

  const totalBills = payments.length;
  const totalAmount = payments.reduce(
    (sum, item) => sum + Number(item.amount || 0),
    0
  );

  const handleDownloadPDF = () => {
    if (payments.length === 0) {
      toast.warning("No payments to download!");
      return;
    }

    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("My Payments Report", 14, 22);
    doc.setFontSize(11);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);
    doc.setFontSize(12);
    doc.text(`Total Bills Paid: ${totalBills}`, 14, 36);
    doc.text(`Total Amount: ৳${totalAmount.toLocaleString()}`, 80, 36);

    const tableColumn = [
      "Username",
      "Email",
      "Amount",
      "Address",
      "Phone",
      "Date",
    ];
    const tableRows = payments.map((p) => [
      p.username,
      p.email,
      `৳${p.amount}`,
      p.address,
      p.phone,
      p.date,
    ]);

    autoTable(doc, {
      startY: 45,
      head: [tableColumn],
      body: tableRows,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [41, 128, 185] },
    });

    doc.save(
      `My_Payments_Report_${new Date().toISOString().split("T")[0]}.pdf`
    );
  };

  const handleUpdateClick = (payment) => {
    setSelectedPayment(payment);
    setShowUpdateModal(true);
  };

  const handleDeleteClick = (payment) => {
    setSelectedPayment(payment);
    setShowDeleteModal(true);
  };

  const handleUpdateSave = async (e) => {
    e.preventDefault();
    const form = e.target;
    const updated = {
      amount: form.amount.value,
      address: form.address.value,
      phone: form.phone.value,
      date: form.date.value,
    };

    const res = await fetch(
      `https://utility-bill-management-server-kappa.vercel.app/payments/${selectedPayment._id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      }
    );

    if (res.ok) {
      toast.success("Payment updated successfully!");
      setShowUpdateModal(false);
      fetchPayments();
    } else {
      toast.error("Update failed!");
    }
  };

  const handleDeleteConfirm = async () => {
    const res = await fetch(
      `https://utility-bill-management-server-kappa.vercel.app/payments/${selectedPayment._id}`,
      {
        method: "DELETE",
      }
    );

    if (res.ok) {
      toast.info("Payment deleted successfully!");
      setPayments((prev) => prev.filter((p) => p._id !== selectedPayment._id));
      setShowDeleteModal(false);
    } else {
      toast.error("Delete failed!");
    }
  };

  if (loading)
    return (
      <p className="text-center text-gray-500 mt-10">
        Loading your payments...
      </p>
    );

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 pt-20 sm:pt-26">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-blue-600">
        My Pay Bills
      </h2>

      {/* Summary */}
      <div className="bg-gradient-to-r from-blue-100 to-indigo-100 p-4 sm:p-6 rounded-2xl shadow mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left">
          <p className="text-lg font-semibold text-gray-700">
            Total Bills Paid:{" "}
            <span className="text-blue-600">{totalBills}</span>
          </p>
          <p className="text-lg font-semibold text-gray-700">
            Total Amount:{" "}
            <span className="text-green-600 font-bold">
              ৳{totalAmount.toLocaleString()}
            </span>
          </p>
        </div>
        <button
          onClick={handleDownloadPDF}
          className="px-6 py-3 cursor-pointer bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white rounded-xl hover:opacity-90 transition w-full sm:w-auto"
        >
          Download Report
        </button>
      </div>

      {/* Payments Display */}
      {payments.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">
          You haven’t paid any bills yet.
        </p>
      ) : (
        <div className="bg-white shadow-lg rounded-2xl p-4 sm:p-6">
          {/* Desktop Table */}
          <table className="min-w-full border border-gray-200 hidden sm:table">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="py-3 px-4 text-left">Username</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Amount</th>
                <th className="py-3 px-4 text-left">Address</th>
                <th className="py-3 px-4 text-left">Phone</th>
                <th className="py-3 px-4 text-left">Date</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((bill) => (
                <tr
                  key={bill._id}
                  className="border-b hover:bg-blue-50 transition"
                >
                  <td className="py-2 px-4">{bill.username}</td>
                  <td className="py-2 px-4">{bill.email}</td>
                  <td className="py-2 px-4 text-green-600 font-semibold">
                    ৳{bill.amount}
                  </td>
                  <td className="py-2 px-4">{bill.address}</td>
                  <td className="py-2 px-4">{bill.phone}</td>
                  <td className="py-2 px-4">{bill.date}</td>
                  <td className="py-2 px-4 flex gap-2">
                    <button
                      onClick={() => handleUpdateClick(bill)}
                      className="text-blue-600 cursor-pointer hover:underline"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDeleteClick(bill)}
                      className="text-red-600 cursor-pointer hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mobile view Cards */}
          <div className="sm:hidden flex flex-col gap-4">
            {payments.map((bill) => (
              <div
                key={bill._id}
                className="bg-blue-50 border border-gray-200 rounded-xl p-4 shadow-sm"
              >
                <p>
                  <span className="font-semibold">Username:</span>{" "}
                  {bill.username}
                </p>
                <p>
                  <span className="font-semibold">Email:</span> {bill.email}
                </p>
                <p>
                  <span className="font-semibold">Amount:</span>{" "}
                  <span className="text-green-600 font-semibold">
                    ৳{bill.amount}
                  </span>
                </p>
                <p>
                  <span className="font-semibold">Address:</span> {bill.address}
                </p>
                <p>
                  <span className="font-semibold">Phone:</span> {bill.phone}
                </p>
                <p>
                  <span className="font-semibold">Date:</span> {bill.date}
                </p>
                <div className="flex gap-3 mt-3">
                  <button
                    onClick={() => handleUpdateClick(bill)}
                    className="text-blue-600 cursor-pointer hover:underline"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDeleteClick(bill)}
                    className="text-red-600 cursor-pointer hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Update Modal */}
      {showUpdateModal && (
        <div className="fixed inset-0 bg-white/70 backdrop-blur-sm flex justify-center items-center z-50 px-4">
          <form
            onSubmit={handleUpdateSave}
            className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg w-full max-w-md"
          >
            <h3 className="text-xl font-bold mb-4 text-blue-600">
              Update Payment
            </h3>
            <label className="block mb-2">Amount:</label>
            <input
              name="amount"
              type="number"
              defaultValue={selectedPayment.amount}
              className="w-full border rounded p-2 mb-3"
              disabled
            />
            <label className="block mb-2">Address:</label>
            <input
              name="address"
              defaultValue={selectedPayment.address}
              className="w-full border rounded p-2 mb-3"
              required
            />
            <label className="block mb-2">Phone:</label>
            <input
              name="phone"
              defaultValue={selectedPayment.phone}
              className="w-full border rounded p-2 mb-3"
              required
            />
            <label className="block mb-2">Date:</label>
            <input
              name="date"
              type="date"
              defaultValue={selectedPayment.date}
              className="w-full border rounded p-2 mb-4"
              disabled
            />
            <div className="flex flex-col sm:flex-row justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowUpdateModal(false)}
                className="px-4 cursor-pointer py-2 bg-gray-300 rounded-lg w-full sm:w-auto"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 cursor-pointer bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white text-white rounded-lg w-full sm:w-auto"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-white/70 backdrop-blur-sm flex justify-center items-center z-50 px-4">
          <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg w-full max-w-sm text-center">
            <h3 className="text-xl cursor-pointer font-bold mb-4 text-red-600">
              Confirm Delete
            </h3>
            <p className="mb-6">
              Are you sure you want to delete this payment?
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 cursor-pointer py-2 bg-gray-300 rounded-lg w-full sm:w-auto"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 cursor-pointer bg-red-600 text-white rounded-lg w-full sm:w-auto"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPayBillsPage;
