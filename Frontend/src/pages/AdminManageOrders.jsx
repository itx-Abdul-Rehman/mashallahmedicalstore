import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
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
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-green-100 p-6">
      <ToastContainer />
      <FaArrowLeft color="16a34a" className="cursor-pointer fixed z-50" onClick={onBack} />

      {/* Page Title */}
      <h1 className="mt-10 text-3xl md:text-4xl font-bold text-green-600 mb-6 text-center animate-pulse">
        Manage Orders
      </h1>

      {/* Orders Grid */}
      <main className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {isResponse ? (
          <>
            {orders.length > 0 ? (
              orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition"
                >
                  <h2 className="text-lg font-bold text-green-700">
                    Order #{order.id.slice(0, 6).toUpperCase()}
                  </h2>
                  <p className="text-sm text-gray-600">
                    
                    Total: Rs {order.totalAmount} <br />
                    Status: {order.orderStatus} <br />
                    Phone No: {order.phone} <br />
                    Address: {order.address} <br />
                    <span
                      className={`font-semibold ${
                        order.status === "pending"
                          ? "text-yellow-600"
                          : order.status === "confirmed"
                          ? "text-blue-600"
                          : order.status === "shipped"
                          ? "text-purple-600"
                          : "text-green-600"
                      }`}
                    >
                      {order.status}
                    </span>
                  </p>

                  {/* Items */}
                  <div className="mt-3">
                    <p className="font-medium">Items:</p>
                    <ul className="list-disc list-inside text-sm text-gray-700">
                      {order.items.map((item, idx) => (
                        <li key={idx}>
                          {item.name} {item.option} - {item.quantity} x Rs {item.price}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action buttons */}
                  <div className="mt-4 flex gap-2">
                    {order.status !== "confirmed" && (
                      <button
                        onClick={() => updateStatus(order.id, "confirmed")}
                        className="px-3 py-1 bg-blue-500 text-white rounded-full"
                      >
                        Confirm
                      </button>
                    )}
                    {order.status !== "shipped" && order.status !== "delivered" && (
                      <button
                        onClick={() => updateStatus(order.id, "shipped")}
                        className="px-3 py-1 bg-purple-500 text-white rounded-full"
                      >
                        Ship
                      </button>
                    )}
                    {order.status !== "delivered" && (
                      <button
                        onClick={() => updateStatus(order.id, "delivered")}
                        className="px-3 py-1 bg-green-500 text-white rounded-full"
                      >
                        Deliver
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600 col-span-full animate-pulse text-xl">
                No orders yet.
              </p>
            )}
          </>
        ) : (
          <p className="text-center text-gray-600 col-span-full">Loading orders...</p>
        )}
      </main>
    </div>
  );
}
