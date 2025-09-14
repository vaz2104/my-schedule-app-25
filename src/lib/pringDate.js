import formatDate from "./formatDate";

export default function pringDate(date) {
    const today = new Date();
    const dateObj = new Date(date);

    let daysDifference = today.getDate() - dateObj.getDate();
    let day = formatDate(dateObj);
    if (daysDifference === 0) day = "сьогодні";
    if (daysDifference === 1) day = "вчора";

    let time = `${dateObj.getHours()}:${dateObj.getMinutes() < 10 ? "0" + dateObj.getMinutes() : dateObj.getMinutes()}`;

    return `${day} в ${time}`;
}
