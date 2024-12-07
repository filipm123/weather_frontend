export default function formatDate(dateString) {
  const date = new Date(dateString); // Parse the string into a Date object

  if (isNaN(date)) {
    return "Invalid date"; // Handle invalid date strings
  }

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}
