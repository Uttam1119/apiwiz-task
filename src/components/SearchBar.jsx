import React, { useState } from "react";
import { findNodeByPath } from "../utils/searchJsonPath";
import { jsonToFlow } from "../utils/jsonToNodes";

export default function SearchBar({ jsonData, onHighlight, darkMode }) {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (!query) return onHighlight(null, "");
    const { nodes } = jsonToFlow(jsonData);
    const node = findNodeByPath(nodes, query);
    if (node) onHighlight(node.id, "Match found");
    else onHighlight(null, "No match found");
  };

  return (
    <div className="mt-4 transition-colors duration-200">
      <label className="block mb-1 font-medium text-gray-900 dark:text-gray-100">
        Search by JSON path
      </label>
      <div className="flex gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. $.user.address.city or items[0].name"
          className="flex-1 p-2 border rounded text-sm
                     bg-white dark:bg-gray-700
                     text-gray-900 dark:text-gray-100
                     border-gray-300 dark:border-gray-600
                     transition-colors"
        />
        <button
          onClick={handleSearch}
          className="px-3 py-1 rounded bg-green-600 hover:bg-green-700 text-white transition-colors"
        >
          Search
        </button>
      </div>
    </div>
  );
}
