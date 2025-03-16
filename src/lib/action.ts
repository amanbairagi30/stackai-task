export const getTypeColor = (type: string) => {
  switch (type.toLowerCase()) {
    case "string":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
    case "number":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    case "boolean":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
    case "object":
      return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300";
    case "array":
      return "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
  }
};
