import React, { useState } from "react";
import { FaTrash, FaEdit, FaCartPlus, FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function MedicineCard({
  name,
  image,
  description,
  price,
  id,
  category,
  isAdmin,
  alertDialog,
  pricePerStrip,
  onAddToCart, // <- Pass function from parent
}) {
  const navigate = useNavigate();
  const [textSize, setTextSize] = useState({ startText: 0, endText: 50 });
  const [isMore, setIsMore] = useState(false);
  const [totalDescriptionSize] = useState(description.length);
  const [added, setAdded] = useState(false);
  const [selectedOption, setSelectedOption] = useState(""); // Tablet / Strip

  const onDelete = async () => {
    alertDialog();
  };

  const onEdit = () => {
    navigate("/admin/manage/update", {
      state: { id, name, img: image, description, price, category, pricePerStrip },
    });
  };

  const onMoreClick = () => {
    setTextSize({ startText: 0, endText: description.length });
    setIsMore(true);
  };

  const onLessClick = () => {
    setTextSize({ startText: 0, endText: 50 });
    setIsMore(false);
  };

  const handleAddToCart = () => {
    if (!selectedOption) {
      alert("Please select Tablet or Strip first!");
      return;
    }

    // if (onAddToCart) {
    //   onAddToCart({
    //     id,
    //     name,
    //     image,
    //     option: selectedOption,
    //     price: selectedOption === "tablet" ? price : pricePerStrip,
    //   });
    // }

    setAdded(true);
    setTimeout(() => setAdded(false), 1500); // reset after 1.5s
  };

  return (
    <div className="relative bg-gradient-to-b from-white to-gray-50 rounded-2xl shadow-md p-5 flex flex-col items-center 
                    hover:shadow-xl hover:-translate-y-2 transition-all duration-300 ease-out cursor-pointer 
                    border border-transparent hover:border-green-400">
      {/* Image */}
      <div className="overflow-hidden rounded-xl w-36 h-36 mb-4">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
        />
      </div>

      {/* Title */}
      <h2 className="text-xl font-bold mb-2 text-gray-800 text-center">{name}</h2>

      {/* Description */}
      <div className="mt-2 text-center">
        <p className="text-gray-600 text-sm">
          {description.slice(textSize.startText, textSize.endText)}
        </p>

        {totalDescriptionSize > 50 && (
          <>
            {!isMore ? (
              <button
                onClick={onMoreClick}
                className="mt-1 inline-flex items-center text-green-600 text-xs font-medium hover:text-green-700 transition-colors"
              >
                <span className="text-gray-600">...</span>
                <span className="ml-1 px-2 py-0.5 bg-green-100 text-green-700 rounded-md shadow-sm hover:bg-green-200">
                  more
                </span>
              </button>
            ) : (
              <button
                onClick={onLessClick}
                className="mt-1 inline-flex items-center text-green-600 text-xs font-medium hover:text-green-700 transition-colors"
              >
                <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-md shadow-sm hover:bg-green-200">
                  less
                </span>
              </button>
            )}
          </>
        )}
      </div>

      {/* Radio Options */}
      <div className="flex items-center justify-around w-full mt-3">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name={`option-${id}`}
            value="tablet"
            checked={selectedOption === "tablet"}
            onChange={(e) => setSelectedOption(e.target.value)}
            className="text-green-600 focus:ring-green-500 accent-green-600"
          />
          <span className="text-gray-800 text-sm">
            1 Tablet = <b>Rs. {price}</b>
          </span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name={`option-${id}`}
            value="strip"
            checked={selectedOption === "strip"}
            onChange={(e) => setSelectedOption(e.target.value)}
            className="text-green-600 focus:ring-green-500 accent-green-600"
          />
          <span className="text-gray-800 text-sm">
            1 Strip = <b>Rs. {pricePerStrip}</b>
          </span>
        </label>
      </div>

      {/* Add to Cart */}
      <button
        onClick={handleAddToCart}
        className={`mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl font-medium 
        transition-all duration-300 ease-in-out transform
        ${added
            ? "bg-green-500 text-white scale-95"
            : "bg-green-600 text-white hover:bg-green-700 hover:scale-105 shadow-md"
          }`}
      >
        {added ? (
          <>
            <FaCheck className="text-white" />
            Added
          </>
        ) : (
          <>
            <FaCartPlus className="text-white" />
            Add to Cart
          </>
        )}
      </button>

      {/* Admin Actions */}
      {isAdmin && (
        <div className="flex gap-4 absolute top-2 right-3">
          <FaEdit className="cursor-pointer hover:scale-110" color="16a34a" onClick={onEdit} />
          <FaTrash className="cursor-pointer hover:scale-110" color="dc2626" onClick={onDelete} />
        </div>
      )}
    </div>
  );
}
