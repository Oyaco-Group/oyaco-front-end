// components/ConfirmationModal.jsx

import React from "react";

const ConfirmationModal = ({ show, onClose, onConfirm, orderStatus }) => {
  if (!show) return null;

  const isDelivered = orderStatus.toLowerCase() === "delivered";

  let statusBorderColorClass = "";
  if (isDelivered) {
    statusBorderColorClass = "border-green-500";
  } else if (orderStatus.toLowerCase().includes("order accepted")) {
    statusBorderColorClass = "border-yellow-500";
  } else if (orderStatus.toLowerCase().includes("on delivery")) {
    statusBorderColorClass = "border-blue-500";
  } else if (orderStatus.toLowerCase().includes("cancelled")) {
    statusBorderColorClass = "border-red-500";
  }

  return (
    <div className="fixed z-50 inset-0 overflow-y-auto flex items-center justify-center">
      <div className="bg-gray-500 opacity-75 fixed inset-0"></div>
      <div className="relative bg-white rounded-lg w-full max-w-md p-4 mx-4 md:p-6 md:mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Delivery Confirmation
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="p-4 mb-4">
          <p
            className={`border-2 ${statusBorderColorClass} rounded-md p-4 mb-4`}
          >
            <span className="font-semibold">Current Status:</span> {orderStatus}
          </p>
          {!isDelivered && (
            <p className="text-gray-700 mb-2">
              Are you sure you want to mark this order as delivered?
            </p>
          )}
        </div>
        {!isDelivered && (
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-600 bg-gray-200 rounded-md mr-2 hover:bg-gray-300 focus:outline-none"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none"
            >
              Confirm
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfirmationModal;
