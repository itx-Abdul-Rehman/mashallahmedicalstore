import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaArrowLeft, FaClipboardList, FaCheckCircle, FaTimesCircle, FaClock } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearMedicine } from "../redux/Medicine/medicineDetailSlice.js";
import { onSnapshot, collection, query, orderBy, doc, updateDoc } from "firebase/firestore";
import { database } from "../Database-Connection/Firebase.js";

export default function AdminManageOrders() {
  const [orders, setOrders] = useState([]);
  const [isResponse, setIsResponse] = useState(true);
  const [filter, setFilter] = useState("pending");
  const [filteredOrders, setFilteredOrders] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

 
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

  // Apply filter
  useEffect(()=>{
    const filteredOrders=filter==="all"?orders:orders.filter((order)=>(
      order.orderStatus===filter
    ))

    setFilteredOrders(filteredOrders);

  },[filter,orders])

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      const orderRef = doc(database, "orders", orderId);
      await updateDoc(orderRef, { orderStatus: newStatus });
      toast.success(`Order ${newStatus} successfully!`);
    } catch (error) {
      toast.error("Failed to update order status");
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
      <h1 className="mt-8 text-3xl md:text-4xl font-bold text-green-600 mb-6 text-center">
        Manage Orders
      </h1>

      {/* Filter Buttons */}
      <div className="sticky top-0 left-0 right-0  flex justify-center gap-4  flex-wrap">
        <button
          onClick={() => setFilter("all")}
          className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm shadow-md transition ${filter === "all" ? "bg-green-500 text-white" : "bg-white text-green-600 hover:bg-green-100"
            }`}
        >
          <FaClipboardList /> All
        </button>
        <button
          onClick={() => setFilter("pending")}
          className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm shadow-md transition ${filter === "pending" ? "bg-yellow-500 text-white" : "bg-white text-yellow-600 hover:bg-yellow-100"
            }`}
        >
          <FaClock /> Pending
        </button>
        <button
          onClick={() => setFilter("delivered")}
          className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm shadow-md transition ${filter === "delivered" ? "bg-green-500 text-white" : "bg-white text-green-600 hover:bg-green-100"
            }`}
        >
          <FaCheckCircle /> Delivered
        </button>
        <button
          onClick={() => setFilter("cancelled")}
          className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm shadow-md transition ${filter === "cancelled" ? "bg-red-500 text-white" : "bg-white text-red-600 hover:bg-red-100"
            }`}
        >
          <FaTimesCircle /> Cancelled
        </button>
      </div>

      {/* Orders Grid */}
      <main className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {isResponse ? (
          <>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
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
                    <span>
                      <h2 className="text-lg font-bold text-green-700">
                        Order #{order.id.slice(0, 6).toUpperCase()}
                      </h2>
                      <p className="text-sm text-gray-600">{order.createdAt.toDate().getHours() + ':' + order.createdAt.toDate().getMinutes()}&nbsp;&nbsp;{order.createdAt.toDate().toDateString()}</p>
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${order.orderStatus === "pending"
                        ? "bg-yellow-100 text-yellow-600"
                        : order.orderStatus === "confirmed"
                          ? "bg-blue-100 text-blue-600"
                          : order.orderStatus === "shipped"
                            ? "bg-purple-100 text-purple-600"
                            : order.orderStatus === "delivered"
                              ? "bg-green-100 text-green-600"
                              : order.orderStatus === "cancelled"
                                ? "bg-red-100 text-red-600"
                                : "bg-gray-100 text-gray-600"
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
                          {item.name}{" "}
                          <b>
                            (
                            {item.option.slice(0, 1).toUpperCase() +
                              item.option.slice(1)}
                            )
                          </b>{" "}
                          - {item.quantity} × Rs {item.price}
                        </li>
                      ))}
                    </ul>
                  </details>


                  {/* Action Buttons */}
                  <div className="mt-4 flex gap-3">
                    {order.orderStatus === "pending" && (
                      <>
                        <button
                          onClick={() => handleUpdateStatus(order.id, "delivered")}
                          className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
                        >
                          Deliver
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(order.id, "cancelled")}
                          className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
                        >
                          Cancel
                        </button>
                      </>
                    )}

                    {order.orderStatus === "delivered" && (
                      <button
                        onClick={() => handleUpdateStatus(order.id, "cancelled")}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
                      >
                        Cancel
                      </button>
                    )}
                  </div>

                </motion.div>
              ))
            ) : (
              <p className="text-center text-gray-500 col-span-full animate-pulse text-lg">
                No {filter} orders found 🚀
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
