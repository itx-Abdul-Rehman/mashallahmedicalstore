import React, { useState, useEffect } from "react";
import { FaTrash, FaPlus, FaMinus, FaTimes, FaShoppingCart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { setQuantity, clearCartItem, removeCartItem } from "../redux/Cart/cartItemSlice.js";
import { useNavigate } from "react-router-dom";


export default function Cart({ onAddMore, onCloseCart, onConfirmPayment }) {
    const cartItems = useSelector((state) => state.cartItem.value);
    const showCart = useSelector((state) => state.showCart.value);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const currentPrice = cartItems.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
        );
        setTotalPrice(currentPrice);
    }, [cartItems]);

    const increaseQty = (index) => {
        dispatch(
            setQuantity({
                index,
                key: "quantity",
                value: cartItems[index].quantity + 1,
            })
        );
    };

    const decreaseQty = (index) => {
        if (cartItems[index].quantity > 1) {
            dispatch(
                setQuantity({
                    index,
                    key: "quantity",
                    value: cartItems[index].quantity - 1,
                })
            );
        }
    };

    const removeItem = (index) => {
        dispatch(removeCartItem({ index }));
    };

    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

    const handleOnClose = () => {
        onCloseCart()
    };

    const handleBrowseProduct = () => {
        onCloseCart();
        navigate("/medicines");
    }

    return (
        <div
            className={`fixed top-0 sm:top-2 right-0 z-50 p-4 h-full sm:p-5 bg-gradient-to-b from-white to-gray-50 sm:rounded-tl-2xl shadow-md space-y-4 border border-transparent hover:border-green-400 transition-transform duration-500 ease-in-out w-full max-w-xl
  ${showCart ? "translate-x-0" : "translate-x-full"}`}
        >
            <div className="flex gap-2 items-center ">
                <h2 className="text-xl sm:text-2xl font-bold mb-2 text-gray-800">🛒 Your Cart - </h2>

                <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-800">{cartItems.length} Items</h3>
            </div>

            {/* Close Cart Button */}
            <div
                className="absolute top-1 right-3 cursor-pointer rounded-full hover:bg-gray-50 p-1 transition-all"
                onClick={handleOnClose}
            >
                <FaTimes size={20} />
            </div>

            {cartItems.length !== 0 ? (
                <>
                    {/* Cart Items */}
                    <div className="flex flex-col gap-4 overflow-y-auto scrollbar-hide h-[63%]">
                        {cartItems.map((item, index) => (
                            <div
                                key={index}
                                className="flex flex-col sm:flex-row items-center justify-between bg-gray-50 p-3 rounded-xl shadow-sm hover:shadow-md transition w-full "
                            >
                                {/* Image + Name */}
                                <div className="flex items-center w-full sm:w-2/5 gap-3 mb-2 sm:mb-0">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                                    />
                                    <div>
                                        <div className="text-gray-800">
                                            <span className="font-medium">{item.name}</span> -{" "}
                                            <span>{capitalize(item.option)}</span>
                                        </div>
                                        <p className="text-sm text-gray-500">Rs. {item.price}</p>
                                    </div>
                                </div>

                                {/* Quantity controls */}
                                <div className="flex items-center justify-center gap-2 w-full sm:w-1/5 mb-2 sm:mb-0">
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

                                {/* Remove Button */}
                                <div className="flex justify-end w-full sm:w-2/5">
                                    <button
                                        onClick={() => removeItem(index)}
                                        className="text-red-600 hover:text-red-800 ml-3"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Add More Items */}
                    <button
                        onClick={onAddMore}
                        className="text-green-600 hover:text-green-700 font-medium mt-2"
                    >
                        + Add more items
                    </button>

                    {/* Total */}
                    <div className="absolute bottom-20 w-full flex flex-row sm:flex-row justify-around items-center mt-4 text-center sm:text-left">
                        <p className="font-bold text-gray-800">Total Amount</p>
                        <p className="font-bold text-green-600 text-lg mt-1 sm:mt-0">
                            Rs. {totalPrice.toFixed(2)}
                        </p>
                    </div>

                    {/* Confirm Payment */}
                    <div onClick={onConfirmPayment} className="absolute bottom-4 left-0 right-0 mx-auto w-[80%]">
                        <button className="w-full bg-green-600 text-white py-3 rounded-xl font-medium hover:bg-green-700 transition-all transform hover:scale-105">
                            Confirm payment and address
                        </button>
                    </div>
                </>
            ) : (
                <div className="flex flex-col items-center justify-center py-10 space-y-4 text-center">
                    <FaShoppingCart className="text-6xl text-green-400 animate-bounce" />
                    <h2 className="text-2xl font-bold text-gray-800">Your cart is empty</h2>
                    <p className="text-gray-500">Looks like you haven’t added any items yet.</p>
                    <button
                        onClick={handleBrowseProduct}
                        className="mt-2 bg-green-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-green-700 transition-all transform hover:scale-105"
                    >
                        Browse Products
                    </button>
                </div>
            )}

        </div>
    );
}
