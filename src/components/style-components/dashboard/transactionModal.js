// TransactionModal.js
import React from "react";
import PropTypes from "prop-types";
import { FaTimes, FaArrowRightToBracket } from "react-icons/fa";
import SpinnerLoad from "../loading-indicator/spinnerLoad"; // Pastikan path ini benar

const formatDate = (dateString) => {
  const options = { day: "numeric", month: "short", year: "numeric" };
  return new Intl.DateTimeFormat("en-GB", options).format(new Date(dateString));
};

const getImageUrl = (imagePath) => {
  const baseUrl = "http://localhost:8080/api/images/";
  return imagePath ? `${baseUrl}${imagePath}` : "/defaultproducts.png";
};

const TransactionModal = ({
  isOpen,
  onClose,
  title,
  transactions,
  handleScroll,
  displayedTransactions,
  loading,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <FaTimes />
          </button>
        </div>
        <div
          className="p-4 overflow-y-auto max-h-[60vh]"
          onScroll={handleScroll}
        >
          {displayedTransactions.length > 0 ? (
            <ul
              role="list"
              className="divide-y divide-gray-200 dark:divide-gray-700"
            >
              {displayedTransactions.map((transaction) => (
                <li key={transaction.id} className="py-3 sm:py-4">
                  <div className="flex items-center">
                    <img
                      src={getImageUrl(transaction.master_product?.image)}
                      alt={transaction.master_product?.name || "Product"}
                      width={50}
                      height={50}
                      onError={(e) => (e.target.src = "/defaultproducts.png")}
                    />
                    <div className="flex-1 min-w-0 ms-4">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        {transaction.master_product?.name || "Product"}
                      </p>
                      <div className="flex gap-2">
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                          {transaction.origin}
                        </p>
                        <FaArrowRightToBracket
                          className={
                            transaction.movement_type.toLowerCase() === "in"
                              ? "text-green-500"
                              : "text-red-500"
                          }
                        />
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                          {transaction.destination}
                        </p>
                      </div>
                      <p className="text-xs text-gray-400">
                        Date: {formatDate(transaction.arrival_date)}
                      </p>
                    </div>
                    <div className="flex flex-col items-center">
                      <p className="text-xs">Stock</p>
                      <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        {transaction.quantity}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col gap-4 items-center justify-center h-[24rem] text-gray-400 p-20 bg-gray-50 rounded-xl">
              <img src="/icons/emptystatetrx.png" height={80} width={80} />
              <p>Transaction is empty</p>
            </div>
          )}
          {loading && <SpinnerLoad />}
        </div>
      </div>
    </div>
  );
};

TransactionModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  transactions: PropTypes.array.isRequired,
  handleScroll: PropTypes.func.isRequired,
  displayedTransactions: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default TransactionModal;
