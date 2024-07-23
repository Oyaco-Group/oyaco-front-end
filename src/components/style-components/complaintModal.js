import React, { useState, useEffect } from "react";
import {
  fetchOrderComplaint,
  fetchUpdateOrderComplaint,
} from "@/fetching/orderHistory";

const ComplaintModal = ({ show, onClose, orderId, onSuccess }) => {
  const [complaintText, setComplaintText] = useState("");
  const [isComplaint, setIsComplaint] = useState(false);
  const [loading, setLoading] = useState(false); // State untuk menangani loading

  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        setLoading(true);
        const response = await fetchOrderComplaint(orderId);
        setComplaintText(response.text);
        setIsComplaint(response.iscomplaint);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching complaint:", error);
        setLoading(false);
      }
    };

    if (show && orderId) {
      fetchComplaint();
    }
  }, [show, orderId]);

  const handleSubmitComplaint = async () => {
    try {
      setLoading(true);
      await fetchUpdateOrderComplaint(orderId, complaintText);
      console.log("Complaint updated successfully!");
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error updating complaint:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed z-50 inset-0 overflow-y-auto flex items-center justify-center">
      <div className="bg-gray-500 opacity-75 fixed inset-0"></div>
      <div className="relative bg-white rounded-lg w-full max-w-md p-4 mx-4 md:p-6 md:mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Complaint Form
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
        {isComplaint ? (
          <div className="mb-4 border border-blue-500 rounded-md">
            <p className="text-sm text-gray-600 ml-2">Your Complaint:</p>
            <div className="p-2 bg-gray-100">{complaintText}</div>
          </div>
        ) : (
          <textarea
            className="border rounded-md w-full p-2 mb-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            placeholder="Enter your complaint here..."
            value={complaintText}
            onChange={(e) => setComplaintText(e.target.value)}
          ></textarea>
        )}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-600 bg-gray-200 rounded-md mr-2 hover:bg-gray-300 focus:outline-none"
          >
            Close
          </button>
          {!isComplaint && (
            <button
              onClick={handleSubmitComplaint}
              className={`px-4 py-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComplaintModal;
