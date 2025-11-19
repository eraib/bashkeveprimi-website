export const toKebabCase = (str: string) => {
  if (typeof str !== "string") return "";
  return str
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
};
