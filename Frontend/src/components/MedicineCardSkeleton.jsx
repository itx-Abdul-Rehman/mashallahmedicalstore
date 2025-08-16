import React from "react";

export default function MedicineCardSkeleton() {
  return (
    <div className="bg-gradient-to-b from-white to-gray-50 rounded-2xl shadow-md p-5 flex flex-col items-center 
                    border border-transparent animate-pulse">
      {/* Image placeholder */}
      <div className="overflow-hidden rounded-xl w-36 h-36 mb-4 bg-gray-200"></div>

      {/* Title placeholder */}
      <div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>

      {/* Description placeholder (3 lines) */}
      <div className="h-3 w-32 bg-gray-200 rounded mb-1"></div>
      <div className="h-3 w-28 bg-gray-200 rounded mb-1"></div>
      <div className="h-3 w-20 bg-gray-200 rounded mb-2"></div>

      {/* Price placeholder */}
      <div className="h-4 w-16 bg-gray-200 rounded mt-2"></div>
    </div>
  );
}
