import React, { useState } from "react";
import { FaTrash, FaPlus, FaMinus, FaTimes } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { setCartItem, clearCartItem, setQuantity, removeCartItem } from "../redux/Cart/cartItemSlice.js";
import { useEffect } from "react";

export default function Cart({ onAddMore }) {
    const cartItems = useSelector((state) => state.cartItem.value);
    const dispatch = useDispatch();
    const [totalPrice, setTotalPrice] = useState(0);


    useEffect(() => {
        const currentPrice = cartItems.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
        );

        setTotalPrice(currentPrice)
    }, [cartItems])


    const increaseQty = (index) => {
        dispatch(
            setQuantity({
                index: index,
                key: "quantity",
                value: cartItems[index].quantity + 1,
            })
        );
    };

    const decreaseQty = (index) => {
        if (cartItems[index].quantity > 1) {
            dispatch(
                setQuantity({
                    index: index,
                    key: "quantity",
                    value: cartItems[index].quantity - 1,
                })
            );
        }
    };

    const removeItem = (index) => {
        dispatch(removeCartItem({index}));
    };


    return (
        <div className="relative p-5 bg-gradient-to-b from-white to-gray-50 rounded-2xl shadow-md space-y-4 border border-transparent hover:border-green-400 transition">
            <h2 className="text-xl font-bold mb-2 text-gray-800">🛒 Your Cart</h2>
             <div className="absolute top-0 right-3 cursor-pointer rounded-full hover:bg-gray-100 p-1 transition-all" onClick={() => dispatch(clearCartItem())}>
               <FaTimes />
             </div>

            {cartItems.map((item, index) => (
                <div
                    key={index}
                    className="flex items-center justify-between bg-gray-50 p-3 rounded-xl shadow-sm hover:shadow-md transition"
                >
                    {/* Image + Name */}
                    <div className="flex items-center gap-3">
                        <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div>
                            <p className="font-medium text-gray-800">{item.name}</p>
                            <p className="text-sm text-gray-500">Rs. {item.price}</p>
                        </div>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => decreaseQty(index)}
                            className="bg-green-100 p-2 rounded-lg hover:bg-green-200 text-green-700 transition"
                        >
                            <FaMinus />
                        </button>
                        <span className="px-2 text-gray-800">{item.quantity}</span>
                        <button
                            onClick={() => increaseQty(index)}
                            className="bg-green-100 p-2 rounded-lg hover:bg-green-200 text-green-700 transition"
                        >
                            <FaPlus />
                        </button>
                    </div>

                    {/* Remove */}
                    <button
                        onClick={() => removeItem(index)}
                        className="text-red-600 hover:text-red-800 ml-3"
                    >
                        <FaTrash />
                    </button>
                </div>
            ))}

            {/* Add More Items */}
            <button
                onClick={onAddMore}
                className="text-green-600 hover:text-green-700 font-medium mt-2"
            >
                + Add more items
            </button>

            {/* Total */}
            <div className="flex justify-between items-center mt-4">
                <p className="font-semibold text-gray-800">Total Amount</p>
                <p className="font-bold text-green-600">
                    Rs. {totalPrice.toFixed(2)}
                </p>
            </div>

            {/* Confirm Payment */}
            <button className="w-full mt-4 bg-green-600 text-white py-3 rounded-xl font-medium hover:bg-green-700 transition-all transform hover:scale-105">
                Confirm payment and address
            </button>
        </div>
    );
}
