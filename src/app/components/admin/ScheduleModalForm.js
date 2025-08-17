"use client";
import { PencilIcon, TrashIcon } from "../ui/Icons";
import BaseModal from "../ui/BaseModal";
import { useState } from "react";

export default function ScheduleModalForm() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [startMinutes, setStartMinutes] = useState("");
  const [startHours, setStartHours] = useState("");
  const [hoursList, setHoursList] = useState([]);
  const [error, setError] = useState("");

  function closeModal() {
    setIsModalVisible(false);
    setHoursList([]);
    setStartHours("");
    setStartMinutes("");
  }

  const hours = [];
  const minutes = [];

  for (let i = 0; i < 24; i++) {
    hours.push(i < 10 ? "0" + i : i);
  }

  for (let i = 0; i < 60; i++) {
    if (i === 0 || i % 5 === 0) {
      minutes.push(i < 10 ? "0" + i : i);
    }
  }

  async function addHours() {
    if (!startHours) return;

    let isError = false;
    const minutes = startMinutes || "00";

    hoursList.forEach((el) => {
      const hoursParts = el.split(":");
      if (startHours == hoursParts[0] && minutes === hoursParts[1]) {
        setError("Даний час вже задано");
        isError = true;
        return;
      }
    });

    setHoursList((prevState) => [...prevState, `${startHours}:${minutes}`]);

    // if (!isError) {
    //   showLoader(`savingNewScheduleItem`);
    //   const savedScheduleItem = await saveScheduleItem(
    //     router?.query?.id,
    //     selectedDate,
    //     `${startHours}:${minutes}`
    //   );

    //   if (savedScheduleItem) {
    //     const calendarPeriod =
    //       CalendarService.generateCalendarDays(initWeekDate);

    //     loadMonthSchedule(
    //       router?.query?.id,
    //       calendarPeriod[0].date,
    //       calendarPeriod[calendarPeriod.length - 1].date,
    //       setMonthSchedule
    //     );
    //   }
    //   hideLoader(`savingNewScheduleItem`);
    // }

    setStartMinutes("");
    setStartHours("");
    // setTimeout(() => {
    //     setError("");
    // }, 3000);
  }

  function selectHours(hours) {
    setStartHours(hours);
    setStartMinutes("00");
  }

  function deleteSchedule() {}

  return (
    <div>
      <div className="mt-4 flex justify-center">
        <button
          className="button dark w-full"
          onClick={() => setIsModalVisible(true)}
        >
          <PencilIcon className={"w-4 h-4 me-2"} />
          Змінити години прийому
        </button>
      </div>

      <BaseModal
        title={"Змінити години прийому"}
        triger={isModalVisible}
        closeFn={closeModal}
        loading={loading}
      >
        <div>
          <div className="mt-4">
            <p className="text-gray-500">Виберіть час прийому</p>
            <div className="flex -mx-1 mt-4 items-center">
              <div className="w-1/3 px-1">
                <select
                  className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 outline-none"
                  onChange={(event) => selectHours(event.target.value)}
                  value={startHours}
                >
                  <option value="">Години</option>
                  {hours.map((el) => {
                    return <option key={`startHours-${el}`}>{el}</option>;
                  })}
                </select>
              </div>
              <div className="w-1/3 px-1">
                <select
                  className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 outline-none"
                  onChange={(event) => setStartMinutes(event.target.value)}
                  value={startMinutes}
                >
                  <option value="">Хвилини</option>
                  {minutes.map((el) => {
                    return <option key={`startMinutess-${el}`}>{el}</option>;
                  })}
                </select>
              </div>
              <div className="w-1/3 px-1">
                <button className="button dark " onClick={() => addHours()}>
                  Додати
                </button>
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-center text-3xl font-bold">
            <span>{startHours ? startHours : "00"}</span>
            <span>:</span>
            <span>{startMinutes ? startMinutes : "00"}</span>
          </div>

          {hoursList.length > 0 && (
            <div className="mt-6">
              <p className="text-gray-500">Додані години</p>
              <div className="flex flex-wrap mt-4 mb-8 -mx-1">
                {hoursList.map((el, index) => {
                  return (
                    <div
                      className="p-1 w-1/3 animate__animated animate__bounceIn"
                      key={`hours-${index}`}
                    >
                      <div className="flex justify-center items-center font-bold text-xl">
                        <span>{el}</span>

                        <div className="ml-1">
                          <button
                            className="button blank !px-2"
                            onClick={() => deleteSchedule(el)}
                          >
                            <TrashIcon className="w-4 text-red-600" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </BaseModal>
    </div>
  );
}
