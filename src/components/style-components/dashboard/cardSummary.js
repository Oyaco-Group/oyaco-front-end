import React from "react";

const CardCount = ({ icon, count, label }) => {
  return (
    <div className="w-full p-4 sm:w-1/2 md:w-1/4">
      <div className="transform rounded-lg border-2 border-gray-200 px-4 py-6 shadow-md">
        {icon && (
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="mb-3 inline-block h-12 w-12 text-blue-400"
            viewBox="0 0 24 24"
          >
            {icon}
          </svg>
        )}
        <h2 className="title-font text-3xl font-medium text-gray-900">
          {count}
        </h2>
        <p className="leading-relaxed">{label}</p>
      </div>
    </div>
  );
};

export default CardCount;
