import CalendarService from "@/components/ui/calendar/CalendarService";
import formatDate from "./formatDate";

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

      if (isOldDay) {
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
