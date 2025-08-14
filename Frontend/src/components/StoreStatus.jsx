import React from 'react';

function StoreStatus({ isOpen, toggleStatus }) {
  return (
    <div className="mb-4 text-center">
      <p className="text-lg">
        Store Status:{" "}
        <span className={isOpen ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
          {isOpen ? "Open" : "Closed"}
        </span>
      </p>
      <button
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={toggleStatus}
      >
        Toggle Store Status
      </button>
    </div>
  );
}

export default StoreStatus;