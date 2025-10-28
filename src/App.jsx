import React, { useState } from "react";
import JsonInput from "./components/JsonInput";

export default function App() {
  const [jsonData, setJsonData] = useState("");
  const [highlightId, setHighlightId] = useState(null);
  const [searchResultText, setSearchResultText] = useState("");
  const [darkMode, setDarkMode] = useState(false); // theme state

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div className="h-screen flex bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
        <aside className="w-96 p-4 border-r bg-white dark:bg-gray-800 transition-colors">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-semibold">JSON Tree Visualizer</h1>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              {darkMode ? "Light" : "Dark"}
            </button>
          </div>

          <JsonInput
            onVisualize={(data) => {
              setJsonData(data);
              setHighlightId(null);
              setSearchResultText("");
            }}
            darkMode={darkMode}
          />
        </aside>
      </div>
    </div>
  );
}
