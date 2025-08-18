import React, { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function MedicineCard({ name, image, description, price, id, category,
  isAdmin, alertDialog, pricePerStrip }) {

  const navigate = useNavigate();
  const [textSize, setTextSize] = useState({
    startText: 0,
    endText: 50
  })
  const [isMore, setIsMore] = useState(false);
  const [totalDescriptionSize, setTotalDescriptionSize] = useState(description.length);

  const onDelete
    = async () => {
      alertDialog();
    }

  const onEdit = () => {
    navigate('/admin/manage/update',
      {
        state: { id, name, img: image, description, price, category, pricePerStrip }
      });
  }

  const onMoreClick = () => {
    setTextSize({
      startText: 0,
      endText: description.length
    })
    setIsMore(true);
  }

  const onLessClick = () => {
    setTextSize({
      startText: 0,
      endText: 50
    })
    setIsMore(false);
  }

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 rounded-2xl shadow-md p-5 flex flex-col items-center 
                    hover:shadow-xl hover:-translate-y-2 transition-all duration-300 ease-out cursor-pointer 
                    border border-transparent hover:border-green-400">
      <div className="overflow-hidden rounded-xl w-36 h-36 mb-4">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
        />
      </div>

      <h2 className="text-xl font-bold mb-2 text-gray-800">{name}</h2>
      <div className="mt-2 text-center">
        <p className="text-gray-600 text-sm ">
          {description.slice(textSize.startText, textSize.endText)}
        </p>

        {totalDescriptionSize > 50 && (
          <>
            {isMore === false ? (
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

      <div className="flex justify-between w-full mt-2">
        <p className="text-gray-800 text-sm">1 Tablet = <b>Rs. {price}</b></p>
        <p className="text-gray-800 text-sm">1 Strip = <b>Rs. {pricePerStrip}</b></p>
      </div>
      {isAdmin &&
        <div className="flex gap-4 absolute top-2 right-3">
          <FaEdit color="16a34a" onClick={onEdit} />
          <FaTrash color="dc2626" onClick={onDelete} />
        </div>
      }

    </div>
  );
}
