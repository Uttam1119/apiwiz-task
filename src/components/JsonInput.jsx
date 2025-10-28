import React, { useState } from "react";
import { parseJson } from "../utils/parseJson";

export default function JsonInput({ onVisualize, darkMode }) {
  const [text, setText] = useState("");
  const [error, setError] = useState(null);

  const handleVisualize = () => {
    const result = parseJson(text || "");
    if (result.error) {
      setError(result.error);
      return;
    }
    setError(null);
    onVisualize(result.data);
  };

  const loadSample = async () => {
    const res = await fetch("/src/sample.json");
    const json = await res.json();
    setText(JSON.stringify(json, null, 2));
  };

  return (
    <div className="transition-colors duration-200">
      <label className="block mb-2 font-medium text-gray-900 dark:text-gray-100">
        Paste JSON
      </label>
      <textarea
        className="w-full h-110 p-3 border rounded text-sm font-mono bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 transition-colors resize-none"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste JSON or click load sample..."
      />
      {error && (
        <div className="text-red-600 text-sm mt-2">{`Error: ${error}`}</div>
      )}
      <div className="flex gap-2 mt-3">
        <button
          onClick={handleVisualize}
          className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors"
        >
          Visualize
        </button>
        <button
          onClick={loadSample}
          className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          Load Sample
        </button>
        <button
          onClick={() => {
            setText("");
            onVisualize({});
          }}
          className="px-3 py-1 rounded bg-gray-200 dark:bg-red-700 text-red-900 dark:text-red-100 hover:bg-red-300 dark:hover:bg-red-600 transition-colors"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
