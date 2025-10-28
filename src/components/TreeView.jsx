import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import ReactFlow, {
  Background,
  MiniMap,
  Controls as RFControls,
  applyNodeChanges,
  applyEdgeChanges,
  ReactFlowProvider,
} from "reactflow";
import "reactflow/dist/style.css";
import { jsonToFlow } from "../utils/jsonToNodes";

function NodeLabel({ data }) {
  return (
    <div className="p-2 text-xs">
      <div className="font-semibold">{data.label}</div>
      {data.value !== undefined && (
        <div className="text-[10px] truncate">{String(data.value)}</div>
      )}
    </div>
  );
}

export default function TreeView({
  data,
  highlightId,
  highlightIdSetter,
  darkMode,
}) {
  const { nodes: initialNodes, edges: initialEdges } = useMemo(
    () => jsonToFlow(data),
    [data]
  );

  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const reactFlowInstance = useRef(null);

  useEffect(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [initialNodes, initialEdges]);

  useEffect(() => {
    if (!highlightId || !reactFlowInstance.current) return;

    const node = nodes.find((n) => n.id === highlightId);
    if (node) {
      reactFlowInstance.current.setCenter(
        node.position.x + (node.width || 150) / 2,
        node.position.y + (node.height || 40) / 2,
        { duration: 300 }
      );
    }

    setNodes((nds) =>
      nds.map((n) => ({
        ...n,
        style:
          n.id === highlightId
            ? { ...n.style, border: "4px solid #FBBF24" } // highlight
            : { ...n.style, border: "2px solid black" }, // reset others
      }))
    );
  }, [highlightId, nodes]);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  // Reset view
  const handleResetView = () => {
    if (reactFlowInstance.current) {
      reactFlowInstance.current.fitView({ padding: 0.2 });

      setNodes((nds) =>
        nds.map((n) => ({
          ...n,
          style: { ...n.style, border: "2px solid black" },
        }))
      );

      if (highlightIdSetter) highlightIdSetter(null);
    }
  };

  return (
    <div
      className={`w-full h-full relative bg-white dark:bg-gray-900 transition-colors`}
    >
      <button
        onClick={handleResetView}
        className="absolute top-4 left-4 z-10 px-3 py-1 bg-blue-500 text-white rounded shadow"
      >
        Reset View
      </button>

      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          fitView
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          attributionPosition="top-right"
          style={{ background: darkMode ? "#111827" : "#f9fafb" }} // dark/light background
          onInit={(rfi) => (reactFlowInstance.current = rfi)}
        >
          <Background color={darkMode ? "#374151" : "#e5e7eb"} gap={16} />
          <MiniMap
            nodeStrokeColor={(n) => {
              if (n.style?.border) return n.style.border;
              return darkMode ? "#9CA3AF" : "#333";
            }}
            nodeColor={(n) =>
              n.style?.background || (darkMode ? "#1F2937" : "#fff")
            }
          />
          <RFControls />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
}
