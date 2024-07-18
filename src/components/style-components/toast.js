import { useEffect } from "react";
import PropTypes from "prop-types";

const toastConfig = {
  success: {
    iconColorClass:
      "bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200",
    iconSvg: (
      <svg
        className="h-5 w-5"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
      </svg>
    ),
    bgColorClass: "bg-white",
    textColorClass: "text-gray-500 dark:text-gray-400",
  },
  danger: {
    iconColorClass: "bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200",
    iconSvg: (
      <svg
        className="h-5 w-5"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
      </svg>
    ),
    bgColorClass: "bg-white",
    textColorClass: "text-gray-500 dark:text-gray-400",
  },
  warning: {
    iconColorClass:
      "bg-orange-100 text-orange-500 dark:bg-orange-700 dark:text-orange-200",
    iconSvg: (
      <svg
        className="h-5 w-5"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
      </svg>
    ),
    bgColorClass: "bg-white",
    textColorClass: "text-gray-500 dark:text-gray-400",
  },
};

const Toast = ({ type, message, onClose, autoClose = false }) => {
  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [onClose, autoClose]);

  const { iconColorClass, iconSvg, bgColorClass, textColorClass } =
    toastConfig[type] || {};

  return (
    <div
      className={`mb-4 flex w-full max-w-xs items-center rounded-lg ${bgColorClass} p-4 ${textColorClass} shadow dark:bg-gray-800`}
      role="alert"
    >
      <div
        className={`inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg ${iconColorClass}`}
      >
        {iconSvg}
        <span className="sr-only">Icon</span>
      </div>
      <div className="ms-3 text-sm font-normal">{message}</div>
      <button
        type="button"
        className="-mx-1.5 -my-1.5 ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-900 focus:ring-2 focus:ring-gray-300 dark:bg-gray-800 dark:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-white"
        onClick={onClose}
        aria-label="Close"
      >
        <span className="sr-only">Close</span>
        <svg
          className="h-3 w-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
      </button>
    </div>
  );
};

Toast.propTypes = {
  type: PropTypes.oneOf(["success", "danger", "warning"]).isRequired,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  autoClose: PropTypes.bool,
};

Toast.defaultProps = {
  autoClose: false,
};

export default Toast;
