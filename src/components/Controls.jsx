import React from "react";

export default function Controls({ onClear, darkMode }) {
  const buttonBase =
    "px-3 py-1 rounded transition-colors duration-200 font-medium";

  return (
    <div className="mt-6">
      <div className="flex gap-2">
        <button
          className={`${buttonBase} bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100`}
        >
          Zoom In
        </button>
        <button
          className={`${buttonBase} bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100`}
        >
          Zoom Out
        </button>
        <button
          className={`${buttonBase} bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100`}
        >
          Fit View
        </button>
        <button
          onClick={onClear}
          className={`${buttonBase} bg-red-500 dark:bg-red-600 text-white`}
        >
          Clear
        </button>
      </div>
    </div>
  );
}
