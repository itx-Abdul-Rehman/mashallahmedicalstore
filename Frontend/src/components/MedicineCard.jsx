import React from "react";

export default function MedicineCard({ name, image, description }) {
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
      <p className="text-gray-600 text-sm text-center line-clamp-3">{description}</p>

      <button className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full shadow 
                         hover:shadow-lg transition-all duration-300">
        Learn More
      </button>
    </div>
  );
}
