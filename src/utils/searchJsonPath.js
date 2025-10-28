export function normalizePath(query) {
  if (!query) return "";
  let q = query.trim();
  if (q.startsWith("$.")) q = q.slice(2);
  if (q.startsWith("$")) q = q.slice(1);
  return q;
}

export function findNodeByPath(nodes, query) {
  const norm = normalizePath(query);
  if (!norm) return null;

  return (
    nodes.find((n) => {
      const p = n.data?.path || "";
      // drop leading '$.' or '$' (if still there)
      const pnorm = p.startsWith("$.")
        ? p.slice(2)
        : p.startsWith("$")
        ? p.slice(1)
        : p;
      return (
        pnorm === norm || pnorm.endsWith("." + norm) || pnorm === "$." + norm
      );
    }) || null
  );
}
