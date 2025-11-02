import daysInMonth from "./daysInMonth";

class CalendarService {
  generateCalendarDays(initDay) {
    const selecteDay = new Date(initDay);
    let firstDayOfMonth = new Date(
      selecteDay.getFullYear(),
      selecteDay.getMonth(),
      1,
      0,
      0,
      0
    );

    let weekdayOfFirstDay = firstDayOfMonth.getDay();
    let currentDays = [];

    for (let day = 0; day < 42; day++) {
      if (day === 0 && weekdayOfFirstDay === 0) {
        firstDayOfMonth.setDate(firstDayOfMonth.getDate() - 6);
      } else if (day === 0) {
        firstDayOfMonth.setDate(
          firstDayOfMonth.getDate() + (day - weekdayOfFirstDay + 1)
        );
      } else {
        firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1);
      }

      let calendarDay = {
        currentMonth: firstDayOfMonth.getMonth() === selecteDay.getMonth(),
        date: new Date(firstDayOfMonth),
        month: firstDayOfMonth.getMonth(),
        number: firstDayOfMonth.getDate(),
        weekDay: firstDayOfMonth.getDay(),
        selected: firstDayOfMonth.toDateString() === selecteDay.toDateString(),
        year: firstDayOfMonth.getFullYear(),
      };

      currentDays.push(calendarDay);
    }

    return currentDays;
  }

  generateWeekDays(initDate) {
    let initDateObject = new Date(initDate);
    let currentDay = new Date(initDate);
    let weekdayOfFirstDay = currentDay.getDay();
    let currentDays = [];

    const weekdays = ["НД", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"];

    for (let day = 0; day < 7; day++) {
      if (day === 0 && weekdayOfFirstDay === 0) {
        currentDay.setDate(currentDay.getDate() - 6);
      } else if (day === 0) {
        currentDay.setDate(
          currentDay.getDate() + (day - weekdayOfFirstDay + 1)
        );
      } else {
        currentDay.setDate(currentDay.getDate() + 1);
      }

      let calendarDay = {
        currentMonth: currentDay.getMonth() === initDateObject.getMonth(),
        date: new Date(currentDay),
        month: currentDay.getMonth(),
        number: currentDay.getDate(),
        day: weekdays[currentDay.getDay()],
        weekDay: currentDay.getDay(),
        year: currentDay.getFullYear(),
      };

      currentDays.push(calendarDay);
    }
    return currentDays;
  }

  nextWeekInitDate(day) {
    const currentDay = new Date(day);
    let currentMonth =
      currentDay.getMonth() == 0 ? 1 : currentDay.getMonth() + 1;
    const dayNumber = currentDay.getDay() == 0 ? 6 : currentDay.getDay() - 1;
    let currentYear = currentDay.getFullYear();

    const startDay = currentDay.getDate() + (7 - dayNumber);

    let newYear = currentYear;
    let newMonth = currentMonth < 10 ? "0" + currentMonth : currentMonth;
    let newDate = startDay;

    if (startDay > 31) {
      newMonth = currentMonth == 12 ? 1 : currentMonth + 1;
      newMonth = newMonth < 10 ? "0" + newMonth : newMonth;
      newYear = currentMonth == 12 ? currentYear + 1 : currentYear;
      newDate = startDay - daysInMonth(currentMonth, currentYear);
    }

    return `${newYear}-${newMonth}-${newDate < 10 ? "0" + newDate : newDate}`;
  }

  previousWeekInitDate(day) {
    const currentDay = new Date(day);
    let currentMonth =
      currentDay.getMonth() == 0 ? 1 : currentDay.getMonth() + 1;
    const dayNumber = currentDay.getDay() == 0 ? 6 : currentDay.getDay() - 1;
    let currentYear = currentDay.getFullYear();

    const startDay = currentDay.getDate() - 7 - dayNumber;

    let newYear = currentYear;
    let newMonth = currentMonth < 10 ? "0" + currentMonth : currentMonth;
    let newDate = startDay;

    if (startDay <= 0) {
      newMonth = currentMonth == 1 ? 12 : currentMonth - 1;
      newYear = currentMonth == 1 ? currentYear - 1 : currentYear;
      newDate = daysInMonth(newMonth, newYear) + startDay;
      newMonth = newMonth < 10 ? "0" + newMonth : newMonth;
    }

    return `${newYear}-${newMonth}-${newDate}`;
  }
  isOldDay(activeDay) {
    return (
      activeDay.getTime() < new Date().getTime() &&
      activeDay.getDate() != new Date().getDate()
    );
  }

  isOldDate(activeDate, appointmentHours) {
    const today = new Date();
    const currentTimeInMinutes = today.getHours() * 60 + today.getMinutes() * 1;

    const hoursParts = appointmentHours.split(":");
    const hoursInMinutes = hoursParts[0] * 60 + hoursParts[1] * 1;

    return (
      (activeDate.getTime() < today.getTime() &&
        activeDate.getDate() != today.getDate()) ||
      (activeDate.getDate() == today.getDate() &&
        hoursInMinutes < currentTimeInMinutes)
    );
  }
}

export default new CalendarService();
