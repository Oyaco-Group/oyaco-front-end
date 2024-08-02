import React, { useState } from "react";
import PropTypes from "prop-types";
import { FaArrowCircleRight } from "react-icons/fa";
import Modal from "../modal";

const formatDate = (dateString) => {
  const options = { day: "numeric", month: "short", year: "numeric" };
  return new Intl.DateTimeFormat("en-GB", options).format(new Date(dateString));
};

const getImageUrl = (imagePath) => {
  const baseUrl = "http://localhost:8080/api/images/";
  return imagePath ? `${baseUrl}${imagePath}` : "/defaultproducts.png";
};

const CardTransaction = ({ transactions, title }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [displayedTransactions, setDisplayedTransactions] = useState(
    transactions.slice(0, 5)
  );
  const [loading, setLoading] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollTop + clientHeight >= scrollHeight && !loading) {
      setLoading(true);
      setTimeout(() => {
        setDisplayedTransactions((prev) => [
          ...prev,
          ...transactions.slice(prev.length, prev.length + 5),
        ]);
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <div className="w-1/2 max-w-md p-4 h-[32rem] bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-md font-semibold leading-none text-gray-900 dark:text-white">
          {title}
        </h3>
        <button
          className="text-sm font-medium text-blue-400 dark:text-blue-500"
          onClick={openModal}
        >
          Detail
        </button>
      </div>
      <div className="flow-root">
        {transactions.slice(0, 5).length > 0 ? (
          <ul
            role="list"
            className="divide-y divide-gray-200 dark:divide-gray-700"
          >
            {transactions.slice(0, 5).map((transaction) => {
              const isExpiredOrRemove =
                transaction.expiration_status ||
                transaction.movement_type.toLowerCase() === "remove";
              return (
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
                        <FaArrowCircleRight
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
                      <p
                        className={`text-xs ${isExpiredOrRemove ? "text-red-500" : ""}`}
                      >
                        {isExpiredOrRemove ? "" : "Stock"}
                      </p>
                      <div
                        className={`inline-flex items-center text-base font-semibold ${isExpiredOrRemove ? "text-red-500 font-semibold" : "text-gray-900 dark:text-white"}`}
                      >
                        {isExpiredOrRemove ? "exp" : transaction.quantity}
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="flex flex-col gap-4 items-center justify-center h-[24rem] text-gray-400 p-20 bg-gray-50 rounded-xl">
            <img src="/icons/emptystatetrx.png" height={80} width={80} />
            <p>Transaction is empty</p>
          </div>
        )}
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} title={title}>
        <div
          className="p-4 overflow-y-auto h-[50vh] text-start"
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
                        <FaArrowCircleRight
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
        </div>
      </Modal>
    </div>
  );
};

CardTransaction.propTypes = {
  transactions: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
};

export default CardTransaction;
