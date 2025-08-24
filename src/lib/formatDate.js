export default function formatDate(date, type = "code") {
  if (!date) return "";
  const dateObject = typeof date === "object" ? date : new Date(date);
  const year = dateObject.getFullYear();
  const month = dateObject.getMonth() + 1;
  const day = dateObject.getDate();

  return type === "ui"
    ? `${day < 10 ? "0" + day : day}-${
        month < 10 ? "0" + month : month
      }-${year}`
    : `${year}-${month < 10 ? "0" + month : month}-${
        day < 10 ? "0" + day : day
      }`;
}
