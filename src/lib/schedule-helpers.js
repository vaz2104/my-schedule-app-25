import CalendarService from "@/components/ui/calendar/CalendarService";
import formatDate from "./formatDate";
import { monthsFullName } from "./calendar-vars";

export function generateHours() {
  const hours = [];
  for (let i = 0; i < 24; i++) {
    hours.push(i < 10 ? "0" + i : i);
  }

  return hours;
}

export function generateMinutes() {
  const minutes = [];

  for (let i = 0; i < 60; i++) {
    if (i === 0 || i % 5 === 0) {
      minutes.push(i < 10 ? "0" + i : i);
    }
  }

  return minutes;
}

export function sortHours(arr) {
  if (!arr || !arr.length) return [];

  let list = [...arr];

  let swapped;
  do {
    swapped = false;
    list.forEach((el, i) => {
      const hours1 = el.split(":");
      const minutes1 = hours1[0] * 60 + hours1[1] * 1;
      if (list[i + 1]) {
        const hours2 = list[i + 1].split(":");
        const minutes2 = hours2[0] * 60 + hours2[1] * 1;

        if (minutes2 < minutes1) {
          let temp = list[i];
          list[i] = list[i + 1];
          list[i + 1] = temp;
          swapped = true;
        }
      }
    });
  } while (swapped);

  // console.log(list);
  return list;
}

export function getScheduleDays(schedule, key) {
  const daysWithSchedule = [];
  const daysWithAppointments = [];
  const daysWithNoAppointments = [];

  schedule.forEach((el) => {
    daysWithSchedule.push(formatDate(el?.date));

    if (el.relations?.length !== Object.keys(el.schedule).length) {
      const isOldDay = CalendarService.isOldDay(new Date(el?.date));
      let availableHours = 0;

      Object.keys(el.schedule).forEach((key) => {
        let hasRelation = false;
        el.relations.forEach((relation) => {
          if (key === relation.appointmentKey) {
            hasRelation = true;
          }
        });

        if (
          !CalendarService.isOldDate(new Date(el?.date), el.schedule[key]) &&
          !hasRelation
        ) {
          availableHours++;
        }
      });

      if (isOldDay || availableHours === 0) {
        daysWithNoAppointments.push(formatDate(el?.date));
      } else {
        daysWithAppointments.push(formatDate(el?.date));
      }
    } else {
      daysWithNoAppointments.push(formatDate(el?.date));
    }
  });

  const object = {
    daysWithSchedule,
    daysWithAppointments,
    daysWithNoAppointments,
  };

  return key ? object[key] : object;
}

export function printDateWithMonth(date) {
  if (!date) return "";
  const dateObject = typeof date === "object" ? date : new Date(date);
  const year = dateObject.getFullYear();
  const month = dateObject.getMonth();
  const day = dateObject.getDate();

  return `${day} ${monthsFullName[month]} ${year}`;
}

export function filterAppointments(list) {
  const filtered = [];
  const temp = [];
  list.map((appointment, index) => {
    const dateMiliseconds = new Date(appointment?.scheduleId?.date).getTime();

    const hoursParts =
      appointment?.scheduleId?.schedule[appointment?.appointmentKey].split(":");
    const hoursInMiliseconds = (hoursParts[0] * 60 + hoursParts[1] * 1) * 60000;
    const convertedDate = dateMiliseconds + hoursInMiliseconds;
    temp.push({ key: index, date: convertedDate });
  });

  temp.sort((a, b) => b.date - a.date);

  temp.forEach((el) => {
    filtered.push(list[el.key]);
  });

  return filtered;
}

export function getSelectedDateOnCalendarChange(initDate) {
  return new Date(initDate).getMonth() === new Date().getMonth()
    ? new Date()
    : initDate;
}
