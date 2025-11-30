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
    const currentMonth = currentDay.getMonth() + 1;
    const currentDayNumber = currentDay.getDay() == 0 ? 7 : currentDay.getDay();
    const currentDate = currentDay.getDate();
    const currentYear = currentDay.getFullYear();

    const CURRENT_MONTH_DAYS = daysInMonth(currentMonth, currentYear);
    const startDay = currentDate + (7 - currentDayNumber) + 1;

    let newYear = currentYear;
    let newMonth = currentMonth;
    let newDate = startDay;

    if (startDay > CURRENT_MONTH_DAYS) {
      if (currentMonth == 12) {
        newYear++;
        newMonth = 1;
      } else {
        newMonth++;
      }

      newDate = startDay - CURRENT_MONTH_DAYS;
    }

    if (newMonth < 10) newMonth = "0" + newMonth;
    if (newDate < 10) newDate = "0" + newDate;

    return `${newYear}-${newMonth}-${newDate}`;
  }

  previousWeekInitDate(day) {
    const currentDay = new Date(day);
    const currentMonth = currentDay.getMonth() + 1;
    const currentDayNumber = currentDay.getDay() == 0 ? 7 : currentDay.getDay();
    const currentDate = currentDay.getDate();
    const currentYear = currentDay.getFullYear();

    const startDay = currentDate - currentDayNumber - 6;

    let newYear = currentYear;
    let newMonth = currentMonth;
    let newDate = startDay;

    if (startDay <= 0) {
      if (currentMonth == 1) {
        newYear--;
        newMonth = 12;
      } else {
        newMonth--;
      }
      const NEW_MONTH_DAYS = daysInMonth(newMonth, currentYear);
      newDate = NEW_MONTH_DAYS - Math.abs(startDay);
    }

    if (newMonth < 10) newMonth = "0" + newMonth;
    if (newDate < 10) newDate = "0" + newDate;
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
