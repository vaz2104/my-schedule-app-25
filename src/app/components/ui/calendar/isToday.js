export default function isToday(day) {
  const today = new Date();
  const newDay = new Date(day);
  return (
    `${newDay.getFullYear()}-${newDay.getMonth()}-${newDay.getDate()}` ===
    `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`
  );
}
