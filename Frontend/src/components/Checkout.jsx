import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FaMapMarkerAlt, FaPhone, FaMoneyBillWave, FaListAlt , FaArrowLeft} from "react-icons/fa";
import LoadingButtons from "./LoadingButton";

export default function Checkout({ onPlaceOrder, onBack, placedOrderResponse }) {
  const cartItems = useSelector((state) => state.cartItem.value);
  const [subtotal, setSubtotal] = useState(0);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({ address: "", phone: "" });

  const deliveryFee = 50.0;

  useEffect(() => {
    const total = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setSubtotal(total);
  }, [cartItems]);

  const totalAmount = subtotal + deliveryFee;

  const handlePlaceOrder = () => {
    if (!address) {
      setErrors(prev => ({ ...prev, address: "Delivery address is required*" }));
      return;
    }

    if (!phone) {
      setErrors(prev => ({ ...prev, phone: "Phone number is required*" }));
      return;
    }

    if (!/^\d+$/.test(phone)) {
      setErrors(prev => ({ ...prev, phone: "Phone number is invalid*" }));
      return;
    }

    const orderDetails = {
      items: cartItems,
      address,
      phone,
      paymentMethod: "Cash on Delivery",
      subtotal,
      deliveryFee,
      totalAmount,
    };

    onPlaceOrder(orderDetails);
  };


  const handleChange = (e) => {
    setErrors({ address: "", phone: "" });
    const { name, value } = e.target;
    if (name === "address") {
      setAddress(value);
    } else if (name === "phone") {
      setPhone(value);
    }
  };

  return (
    <div className="fixed top-0 sm:top-2 right-0 z-50 p-4 sm:p-5 bg-gradient-to-b from-white to-gray-50 sm:rounded-tl-2xl shadow-md border border-transparent w-full max-w-xl h-full flex flex-col">
      {/* Header */}
      <div className="flex gap-3 items-center">
        <FaArrowLeft size={24}  className="cursor-pointer
         rounded-full hover:bg-gray-50 p-1 transition-all" onClick={onBack} />
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Checkout</h2>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto space-y-3 mt-3 pr-2 scrollbar-hide">
        {/* Address Form */}
        <div className="space-y-3">
          <div>
            <div className="flex items-center gap-2 text-gray-700 font-medium">
              <FaMapMarkerAlt className="text-green-600" /> Delivery Address*
            </div>
            <textarea
              rows="3"
              value={address}
              name="address"
              onChange={handleChange}
              className="w-full border rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your full address"
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address}</p>
            )}
          </div>


          <div>
            <div className="flex items-center gap-2 text-gray-700 font-medium">
              <FaPhone className="text-green-600" /> Phone Number*
            </div>
            <input
              type="text"
              name="phone"
              value={phone}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your phone number"
            />
          </div>
          <p>{errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}</p>
        </div>

        {/* Payment Method */}
        <div className="p-3 flex flex-col gap-3 border rounded-lg bg-gray-50">
          <div className="flex items-center gap-2">
            <FaMoneyBillWave className="text-green-600" />
            <h3 className="font-semibold text-gray-800">Payment Method</h3>
          </div>
          <div className="flex justify-between">
            <p className="font-medium mt-1">Cash</p>
            <p className="font-normal text-gray-600 mt-1">Rs. {totalAmount.toFixed(2)}</p>
          </div>
        </div>

        {/* Order Summary */}
        <div className="p-3 border rounded-lg bg-gray-50">
          <div className="flex items-center gap-2 mb-2">
            <FaListAlt className="text-green-600" />
            <h3 className="font-semibold text-gray-800">Order Summary</h3>
          </div>

          {cartItems.map((item, idx) => (
            <div className="flex justify-between text-sm text-gray-600 mb-2" key={idx}>
              <div>
                <p>{item.quantity}x {item.name}</p>
                <p>{item.option}</p>
              </div>
              <div><span>Rs. {item.price}</span></div>
            </div>
          ))}

          <hr className="my-2" />

          <div className="space-y-1 text-sm text-gray-600">
            <p className="flex justify-between">
              <span>Subtotal</span>
              <span>Rs. {subtotal.toFixed(2)}</span>
            </p>
            <p className="flex justify-between">
              <span>Delivery Fee</span>
              <span>Rs. {deliveryFee.toFixed(2)}</span>
            </p>
          </div>

        </div>
      </div>

      {/* Fixed Footer */}
      <div className="bg-white w-full p-4 rounded-tr-xl rounded-tl-xl shadow-lg border border-transparent">
        <p className="flex justify-between font-bold text-gray-800 mb-3">
          <span>Total (incl. fees and tax)</span>
          <span className="text-green-600">Rs. {totalAmount.toFixed(2)}</span>
        </p>
        {placedOrderResponse ?(
        <button
          onClick={handlePlaceOrder}
          className="w-full bg-green-600 text-white py-3 rounded-xl font-medium hover:bg-green-700 transition-all transform hover:scale-105"
        >
          Place Order
        </button>
        ): (<LoadingButtons text="Placing Order"/>)}
      </div>
    </div>

  );
}
