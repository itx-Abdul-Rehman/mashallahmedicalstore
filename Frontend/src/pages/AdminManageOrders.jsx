import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaArrowLeft, FaCheck, FaTruck, FaBoxOpen } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearMedicine } from "../redux/Medicine/medicineDetailSlice.js";
import { onSnapshot, collection, query, orderBy, updateDoc, doc } from "firebase/firestore";
import { database } from "../Database-Connection/Firebase.js";

export default function AdminManageOrders() {
  const [orders, setOrders] = useState([]);
  const [isResponse, setIsResponse] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Go back button
  const onBack = () => {
    dispatch(clearMedicine());
    navigate("/admin");
  };

  // Check auth
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
    }
  }, []);

  // Fetch orders in real-time
  useEffect(() => {
    const q = query(collection(database, "orders"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const orderList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders(orderList);
      setIsResponse(true);
    });
    return () => unsubscribe();
  }, []);

  // Update order status
  const updateStatus = async (orderId, status) => {
    try {
      const orderRef = doc(database, "orders", orderId);
      await updateDoc(orderRef, { status, updatedAt: new Date() });
      toast.success(`Order marked as ${status}`);
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-6">
      <ToastContainer />

      {/* Back Button */}
      <button
        onClick={onBack}
        className="fixed top-5 left-5 z-50 bg-white shadow-md rounded-full p-3 hover:bg-green-100 transition"
      >
        <FaArrowLeft className="text-green-600 text-lg" />
      </button>

      {/* Page Title */}
      <h1 className="mt-12 text-3xl md:text-4xl font-bold text-green-600 mb-8 text-center">
        Manage Orders
      </h1>

      {/* Orders Grid */}
      <main className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {isResponse ? (
          <>
            {orders.length > 0 ? (
              orders.map((order) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl border-t-4 border-green-400"
                >
                  {/* Header */}
                  <div className="flex justify-between items-center mb-3">
                    <h2 className="text-lg font-bold text-green-700">
                      Order #{order.id.slice(0, 6).toUpperCase()}
                    </h2>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        order.orderStatus === "pending"
                          ? "bg-yellow-100 text-yellow-600"
                          : order.orderStatus === "confirmed"
                          ? "bg-blue-100 text-blue-600"
                          : order.orderStatus === "shipped"
                          ? "bg-purple-100 text-purple-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {order.orderStatus}
                    </span>
                  </div>

                  {/* Order Details */}
                  <p className="text-sm text-gray-600 leading-6">
                    <strong>Total Amount:</strong> Rs {order.totalAmount} <br />
                    <strong>Phone:</strong> {order.phone} <br />
                    <strong>Address:</strong> {order.address}
                  </p>

                  {/* Items */}
                  <details className="mt-4">
                    <summary className="cursor-pointer font-medium text-gray-700 hover:text-green-600">
                      View Items
                    </summary>
                    <ul className="list-disc list-inside text-sm text-gray-700 mt-2 space-y-1">
                      {order.items.map((item, idx) => (
                        <li key={idx}>
                          {item.name} <b>({item.option.slice(0,1).toUpperCase()+item.option.slice(1)})</b> - {item.quantity} × Rs {item.price}
                        </li>
                      ))}
                    </ul>
                  </details>

                  {/* Action buttons */}
                  <div className="mt-5 flex gap-2 flex-wrap">
                    {order.orderStatus !== "confirmed" && (
                      <button
                        onClick={() => updateStatus(order.id, "confirmed")}
                        className="flex items-center gap-2 px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-full text-sm transition"
                      >
                        <FaCheck /> Confirm
                      </button>
                    )}
                    {order.orderStatus !== "shipped" && order.orderStatus !== "delivered" && (
                      <button
                        onClick={() => updateStatus(order.id, "shipped")}
                        className="flex items-center gap-2 px-3 py-1.5 bg-purple-500 hover:bg-purple-600 text-white rounded-full text-sm transition"
                      >
                        <FaTruck /> Ship
                      </button>
                    )}
                    {order.orderStatus !== "delivered" && (
                      <button
                        onClick={() => updateStatus(order.id, "delivered")}
                        className="flex items-center gap-2 px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white rounded-full text-sm transition"
                      >
                        <FaBoxOpen /> Deliver
                      </button>
                    )}
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-center text-gray-500 col-span-full animate-pulse text-lg">
                No orders yet 🚀
              </p>
            )}
          </>
        ) : (
          <p className="text-center text-gray-600 col-span-full animate-bounce">
            Loading orders...
          </p>
        )}
      </main>
    </div>
  );
}
