"use client";
import { PencilIcon, TrashIcon } from "../ui/Icons";
import BaseModal from "../ui/BaseModal";
import { useState } from "react";
import { AuthService } from "@/services/AuthService";
import { useParams } from "next/navigation";
import { ScheduleService } from "@/services/ScheduleService";
import formatDate from "@/lib/formatDate";
import { useCalendarStore } from "../ui/calendar/useCalendarStore";
import { useShallow } from "zustand/shallow";
import generateRandomKey from "@/lib/generateRandomKey";
import {
  generateHours,
  generateMinutes,
  sortHours,
} from "@/lib/schedule-helpers";

export default function DayScheduleModalForm({ activeSchedule, selectedDate }) {
  const { setInitCalendarDate } = useCalendarStore(
    useShallow((state) => ({
      setInitCalendarDate: state.setInitCalendarDate,
    }))
  );

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [startMinutes, setStartMinutes] = useState("");
  const [startHours, setStartHours] = useState("");
  const [hoursList, setHoursList] = useState({});
  const [error, setError] = useState("");
  const params = useParams();
  const hours = generateHours();
  const minutes = generateMinutes();

  function closeModal() {
    setIsModalVisible(false);
    setHoursList([]);
    setStartHours("");
    setStartMinutes("");
  }

  function hoursValidation(hour) {
    if (activeSchedule) {
      return false;
    } else {
      if (!hoursList) return false;

      let keys = Object.keys(hoursList);
      const lastSelected = hoursList[keys[keys.length - 1]];
      if (!lastSelected) return false;

      const lastSelectedParts = lastSelected.split(":");

      return (
        hour < lastSelectedParts[0] ||
        (hour <= lastSelectedParts[0] &&
          lastSelectedParts[1] == minutes[minutes.length - 1])
      );
    }
  }

  function minutesValidation(minutes) {
    if (activeSchedule) {
      return false;
    } else {
      if (!hoursList) return false;

      let keys = Object.keys(hoursList);
      const lastSelected = hoursList[keys[keys.length - 1]];
      if (!lastSelected) return false;

      const lastSelectedParts = lastSelected.split(":");

      return (
        startHours == lastSelectedParts[0] && minutes <= lastSelectedParts[1]
      );
    }
  }

  async function addHours() {
    if (!startHours) return;
    const minutes = startMinutes || "00";

    if (activeSchedule) {
      let isError = false;

      if (hoursList) {
        Object.keys(hoursList).forEach((el) => {
          const hoursParts = hoursList[el].split(":");
          if (startHours == hoursParts[0] && minutes === hoursParts[1]) {
            setError("Даний час вже задано");
            isError = true;
            return false;
          }
        });
      }

      if (!isError) {
        setHoursList((prevState) => {
          const tempState = [];

          Object.keys(prevState).map((scheduleItemKey) => {
            tempState.push(prevState[scheduleItemKey]);
          });

          tempState.push(`${startHours}:${minutes}`);

          let sortedHours = sortHours(tempState);

          const newState = {};
          sortedHours.forEach((hour) => {
            let key = null;

            Object.keys(prevState).map((scheduleItemKey) => {
              if (prevState[scheduleItemKey] === hour) {
                key = scheduleItemKey;
              }
            });

            if (!key) {
              key = `appointment_${generateRandomKey(5, true)}`;
            }
            newState[key] = hour;
          });

          return newState;
        });
      }
    } else {
      setHoursList((prevState) => {
        let newState = prevState ? JSON.parse(JSON.stringify(prevState)) : {};
        newState[
          `appointment_${generateRandomKey(5, true)}`
        ] = `${startHours}:${minutes}`;

        return newState;
      });
    }

    setStartMinutes("");
    setStartHours("");
  }

  function selectHours(hours) {
    setStartHours(hours);
    setStartMinutes("00");
  }

  function deleteScheduleItem(appointmentKey) {
    setHoursList((prevHoursState) => {
      const newState = JSON.parse(JSON.stringify(prevHoursState));
      delete newState[appointmentKey];
      return newState;
    });

    setStartMinutes("");
    setStartHours("");
  }

  async function createSchedule() {
    if (!Object.keys(hoursList).length) {
      setError("Додайте години прийому");
      return false;
    }

    setIsLoading(true);

    const session = await AuthService.getSession();
    const response = await ScheduleService.create({
      botId: params?.companyID,
      workerId: session?.userId,
      date: formatDate(selectedDate),
      schedule: hoursList,
      timestamp: Date.now(),
    });

    // console.log(response);

    if (response.status !== 200) {
      setError("Сталася помилка при завантаженні даних");
      setIsLoading(false);
    } else {
      setInitCalendarDate(
        new Date(selectedDate).getMonth() === new Date().getMonth()
          ? new Date()
          : selectedDate
      );
      closeModal();
    }

    setIsLoading(false);
  }

  async function updateSchedule() {
    setIsLoading(true);
    let response = null;

    if (!Object.keys(hoursList).length) {
      response = await ScheduleService.delete(activeSchedule?._id);
    } else {
      response = await ScheduleService.update(activeSchedule?._id, {
        schedule: hoursList,
      });
    }

    if (response.status !== 200) {
      setError("Сталася помилка при завантаженні даних");
      setIsLoading(false);
    } else {
      setInitCalendarDate(
        new Date(selectedDate).getMonth() === new Date().getMonth()
          ? new Date()
          : selectedDate
      );
      closeModal();
    }

    setIsLoading(false);
  }

  function initFormState() {
    setIsModalVisible(true);
    setHoursList(activeSchedule.schedule);
  }

  return (
    <div>
      <div className="mt-4 flex justify-center">
        <button
          className="button dark w-full"
          onClick={() =>
            activeSchedule ? initFormState() : setIsModalVisible(true)
          }
        >
          <PencilIcon className={"w-4 h-4 me-2"} />
          {activeSchedule ? "Змінити години прийому" : "Додати графік"}
        </button>
      </div>

      <BaseModal
        title={activeSchedule ? "Змінити години прийому" : "Додати графік"}
        triger={isModalVisible}
        cancelFn={closeModal}
        confirmFn={activeSchedule ? updateSchedule : createSchedule}
        loading={isLoading}
        error={error}
        hideErrorFn={() => setError(null)}
      >
        <div>
          <div className="mt-4">
            <p className="text-gray-500">Виберіть час прийому</p>
            <div className="mt-4">
              <div className="flex -mx-1 mt-4 items-center">
                <div className="w-1/3 px-1">
                  <select
                    className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 outline-none"
                    onChange={(event) => selectHours(event.target.value)}
                    value={startHours}
                  >
                    <option value="">Години</option>
                    {hours.map((el) => {
                      return (
                        <option
                          key={`startHours-${el}`}
                          disabled={hoursValidation(el)}
                          className={`${hoursValidation(el) ? "hidden" : ""}`}
                        >
                          {el}
                        </option>
                      );
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
                      return (
                        <option
                          key={`startMinutess-${el}`}
                          disabled={minutesValidation(el)}
                          className={`${minutesValidation(el) ? "hidden" : ""}`}
                        >
                          {el}
                        </option>
                      );
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
          </div>
          <div className="mt-6 flex justify-center text-3xl font-bold">
            <span>{startHours ? startHours : "00"}</span>
            <span>:</span>
            <span>{startMinutes ? startMinutes : "00"}</span>
          </div>

          {hoursList && Object.keys(hoursList).length > 0 && (
            <div className="mt-6">
              <p className="text-gray-500">Додані години</p>
              <div className="mt-4 mb-8 -mx-1">
                {Object.keys(hoursList).map((itemKey) => {
                  return (
                    <div
                      className="py-4 relative flex justify-between items-center"
                      key={`schedule-${itemKey}`}
                    >
                      <div className="absolute bottom-0 left-2 right-2 border-t border-t-gray-200"></div>
                      <div className="font-bold text-lg ml-2">
                        {hoursList[itemKey]}
                      </div>
                      <div className="flex-1 ml-4 flex items-center">
                        <p className="text-sm text-gray-500">Запис відсутній</p>
                      </div>
                      <div className="text-right">
                        <div className="flex">
                          <div className="flex justify-center">
                            <button
                              className="button blank !px-2"
                              onClick={() => deleteScheduleItem(itemKey)}
                            >
                              <TrashIcon className="w-4 text-red-600" />
                            </button>
                          </div>
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
