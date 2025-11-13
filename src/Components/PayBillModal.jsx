import React, { useState, useContext } from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { AuthContext } from "../Context/AuthContext";

Modal.setAppElement("#root");

const PayBillModal = ({ isOpen, onClose, bill }) => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: "",
    address: "",
    phone: "",
    additionalInfo: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const paymentData = {
      title: bill.title,
      category: bill.category,
      email: user?.email || "demo@user.com",
      location: bill.location,
      description: bill.description,
      image: bill.image,
      date: new Date().toISOString().split("T")[0],
      amount: bill.amount,
      username: formData.username,
      address: formData.address,
      phone: formData.phone,
      additionalInfo: formData.additionalInfo,
    };

    try {
      const res = await fetch(
        "https://utility-bill-management-server-kappa.vercel.app/payments",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(paymentData),
        }
      );

      const result = await res.json();

      if (res.ok) {
        toast.success(result.message || "Payment successful!");
        onClose();
        setFormData({
          username: "",
          address: "",
          phone: "",
          additionalInfo: "",
        });
      } else {
        toast.error(result.error || "Payment failed!");
      }
    } catch (err) {
      toast.error("Payment failed!");
      console.error(err);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-[#f0f4ff] to-white flex items-start justify-center p-4">
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        contentLabel="Pay Bill Modal"
        className="bg-white dark:bg-gray-900 w-full max-w-2xl mx-auto mt-[100px] rounded-2xl shadow-2xl outline-none overflow-y-auto max-h-[80vh] p-6 sm:p-8"
        overlayClassName="fixed inset-0 bg-blue-50/40 flex justify-center items-start backdrop-blur-md px-4"
      >
        <h2 className="text-3xl font-bold mb-6 text-blue-600 text-center">
          Pay Bill
        </h2>

        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-5 rounded-xl shadow mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700">
            <p>
              <strong>Email:</strong> {user?.email || "demo@user.com"}
            </p>
            <p>
              <strong>Bill ID:</strong> {bill._id}
            </p>
            <p>
              <strong>Amount:</strong> ${bill.amount}
            </p>
            <p>
              <strong>Date:</strong> {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {["username", "address", "phone"].map((name) => (
            <div key={name}>
              <label className="block text-sm font-medium mb-1">
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </label>
              <input
                type="text"
                name={name}
                value={formData[name]}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium mb-1">
              Additional Info
            </label>
            <textarea
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleChange}
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex justify-end gap-4 pt-4 flex-wrap sm:flex-nowrap">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-gray-400 text-white rounded-xl hover:bg-gray-500 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500  text-white rounded-xl cursor-pointer"
            >
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default PayBillModal;
