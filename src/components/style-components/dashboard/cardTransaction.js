import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FaArrowRightToBracket } from "react-icons/fa6";
import TransactionModal from "@/components/style-components/dashboard/transactionModal.js";

const formatDate = (dateString) => {
  const options = { day: "numeric", month: "short", year: "numeric" };
  return new Intl.DateTimeFormat("en-GB", options).format(new Date(dateString));
};

const CardTransaction = ({ transactions }) => {
  const [inTransactions, setInTransactions] = useState([]);
  const [outTransactions, setOutTransactions] = useState([]);

  useEffect(() => {
    if (Array.isArray(transactions)) {
      setInTransactions(
        transactions.filter(
          (transaction) => transaction.movement_type.toLowerCase() === "in"
        )
      );
      setOutTransactions(
        transactions.filter(
          (transaction) => transaction.movement_type.toLowerCase() === "out"
        )
      );
    }
  }, [transactions]);

  return (
    <>
      <div className="w-1/2 max-w-md p-4 h-[32rem] bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-md font-semibold leading-none text-gray-900 dark:text-white">
            Transactions In
          </h3>
          <a
            href="#"
            className="text-sm font-medium text-blue-400 dark:text-blue-500"
          >
            Detail
          </a>
        </div>
        <div className="flow-root">
          {inTransactions.length > 0 ? (
            <ul
              role="list"
              className="divide-y divide-gray-200 dark:divide-gray-700"
            >
              {inTransactions.map((transaction) => (
                <li key={transaction.id} className="py-3 sm:py-4">
                  <div className="flex items-center">
                    <img
                      src="/defaultproducts.png"
                      alt={transaction.master_product?.name || "Product"}
                      width={50}
                      height={50}
                    />
                    <div className="flex-1 min-w-0 ms-4">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        {transaction.master_product?.name || "Product"}
                      </p>
                      <div className="flex gap-2">
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                          {transaction.origin}
                        </p>
                        <FaArrowRightToBracket className="text-green-500" />
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
      </div>

      <div className="w-1/2 max-w-md p-4 h-[32rem] bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-md font-semibold leading-none text-gray-900 dark:text-white">
            Transactions Out
          </h3>
          <a
            href="#"
            className="text-sm font-medium text-blue-400 dark:text-blue-500"
          >
            Detail
          </a>
        </div>
        <div className="flow-root">
          {outTransactions.length > 0 ? (
            <ul
              role="list"
              className="divide-y divide-gray-200 dark:divide-gray-700"
            >
              {outTransactions.map((transaction) => (
                <li key={transaction.id} className="py-3 sm:py-4">
                  <div className="flex items-center">
                    <img
                      src="/defaultproducts.png"
                      alt={transaction.master_product?.name || "Product"}
                      width={50}
                      height={50}
                    />
                    <div className="flex-1 min-w-0 ms-4">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        {transaction.master_product?.name || "Product"}
                      </p>
                      <div className="flex gap-2">
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                          {transaction.destination}
                        </p>
                        <FaArrowRightToBracket className="text-red-500" />
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                          {transaction.origin}
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
      </div>
    </>
  );
};

CardTransaction.propTypes = {
  transactions: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
};

export default CardTransaction;
