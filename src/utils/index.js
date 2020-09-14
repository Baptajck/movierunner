export const truncStr = (string, limit) => (string.length > limit
  ? `${string
    .trim()
    .substring(0, limit - 3)
    .trim()}...`
  : string);