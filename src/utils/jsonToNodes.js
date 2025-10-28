let idCounter = 1;

function makeId() {
  return `n${idCounter++}`;
}

function walk(
  obj,
  path = "$",
  depth = 0,
  xOffset = 0,
  nodes = [],
  edges = [],
  parentId = null
) {
  const id = makeId();
  const label = path === "$" ? "$" : path.split(".").slice(-1)[0];
  const isArray = Array.isArray(obj);
  const type =
    obj === null
      ? "primitive"
      : isArray
      ? "array"
      : typeof obj === "object"
      ? "object"
      : "primitive";
  const value = type === "primitive" ? obj : undefined;
  const position = {
    x: depth * 220 + xOffset,
    y: Object.keys(nodes).length * 80,
  };

  function getNodeColor(type) {
    switch (type) {
      case "object":
        return "#6366F1";
      case "array":
        return "#10B981";
      case "primitive":
        return "#F59E0B";
      default:
        return "#9CA3AF";
    }
  }

  nodes.push({
    id,
    type: "customNode",
    data: { label, value, type, path },
    position,
    style: {
      padding: 6,
      minWidth: 140,
      borderRadius: 6,
      border: "2px solid black",
      backgroundColor: getNodeColor(type),
      color: "#fff",
      fontWeight: 500,
      fontSize: "12px",
    },
  });

  // nodes.push({
  //   id,
  //   type: "default",
  //   data: { label, path, value },
  //   position,
  //   style: { padding: 6, minWidth: 140 },
  // });

  if (parentId) {
    edges.push({
      id: `e${parentId}-${id}`,
      source: parentId,
      target: id,
      animated: false,
    });
  }

  if (type === "object") {
    for (const [k, v] of Object.entries(obj)) {
      walk(
        v,
        path === "$" ? `${path}.${k}` : `${path}.${k}`,
        depth + 1,
        xOffset,
        nodes,
        edges,
        id
      );
    }
  } else if (type === "array") {
    for (let i = 0; i < obj.length; i++) {
      const k = `[${i}]`;
      walk(obj[i], `${path}${k}`, depth + 1, xOffset, nodes, edges, id);
    }
  }

  return { nodes, edges };
}

export function jsonToFlow(json) {
  idCounter = 1;
  const { nodes, edges } = walk(json);
  return { nodes, edges };
}
