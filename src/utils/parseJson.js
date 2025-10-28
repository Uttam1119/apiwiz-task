export function parseJson(input) {
  const trimmed = (input || "").trim();
  if (!trimmed) return { data: {}, error: null };
  try {
    return { data: JSON.parse(trimmed), error: null };
  } catch (err) {
    return { data: null, error: err.message };
  }
}
