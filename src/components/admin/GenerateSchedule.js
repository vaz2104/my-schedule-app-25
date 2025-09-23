"use client";
import { CheckCircleIcon, PlusIcon, TrashIcon } from "../ui/Icons";
import BaseModal from "../ui/BaseModal";
import { useRef, useState } from "react";
import Calendar from "../ui/calendar/Calendar";
import { cn } from "@/lib/cn";
import Lottie from "lottie-react";
import successAnimation from "@/lib/success-animation.json";
import { ScheduleService } from "@/services/ScheduleService";
import { useParams } from "next/navigation";
import { AuthService } from "@/services/AuthService";
import { useCalendarStore } from "../ui/calendar/useCalendarStore";
import { useShallow } from "zustand/shallow";
import generateRandomKey from "@/lib/generateRandomKey";

export default function GenerateSchedule({ successHandler, disabledDays }) {
  const { setInitCalendarDate } = useCalendarStore(
    useShallow((state) => ({
      setInitCalendarDate: state.setInitCalendarDate,
    }))
  );

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [startMinutes, setStartMinutes] = useState("");
  const [startHours, setStartHours] = useState("");
  const [hoursList, setHoursList] = useState([]);
  const [activeStep, setActiveStep] = useState(1);
  const [selectedDays, setSelectedDays] = useState([]);
  const [error, setError] = useState("");
  const params = useParams();

  function closeModal() {
    setIsModalVisible(false);
    setHoursList([]);
    setSelectedDays([]);
    setStartHours("");
    setStartMinutes("");
    setActiveStep(1);
    setInitCalendarDate(new Date());
    if (successHandler) successHandler();
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

    setStartMinutes("");
    setStartHours("");
  }

  function deleteScheduleItem(appointmentTime) {
    setHoursList((prevHoursState) =>
      prevHoursState.filter((id) => id !== appointmentTime)
    );
    setStartMinutes("");
    setStartHours("");
  }

  function selectHours(hours) {
    setStartHours(hours);
    setStartMinutes("00");
  }

  function hoursValidation(hour) {
    const lastSelected = hoursList[hoursList.length - 1];
    if (!lastSelected) return false;

    const lastSelectedParts = lastSelected.split(":");

    return (
      hour < lastSelectedParts[0] ||
      (hour <= lastSelectedParts[0] &&
        lastSelectedParts[1] == minutes[minutes.length - 1])
    );
  }

  function minutesValidation(minutes) {
    const lastSelected = hoursList[hoursList.length - 1];
    if (!lastSelected) return false;

    const lastSelectedParts = lastSelected.split(":");

    return (
      startHours == lastSelectedParts[0] && minutes <= lastSelectedParts[1]
    );
  }

  const lottieRef = useRef();

  async function saveSchedule() {
    setIsLoading(true);

    const session = await AuthService.getSession();
    const modifiedHoursList = {};
    hoursList.forEach(
      (el) =>
        (modifiedHoursList[`appointment_${generateRandomKey(5, true)}`] = el)
    );

    console.log(selectedDays);

    try {
      Promise.all(
        selectedDays.map(async (day) => {
          await ScheduleService.create({
            botId: params?.companyID,
            workerId: session?.userId,
            date: day,
            schedule: modifiedHoursList,
            timestamp: Date.now(),
          });
        })
      ).then(() => {
        setIsLoading(false);
        setActiveStep(activeStep + 1);
        lottieRef.current.play();
      });
    } catch (error) {
      setError("Сталася помилка при завантаженні даних");
    }
  }

  return (
    <div>
      <div className="flex justify-center">
        <button
          className="button dark w-full"
          onClick={() => setIsModalVisible(true)}
        >
          <PlusIcon className={"w-4 h-4 me-2"} />
          Додати графік
        </button>
      </div>

      <BaseModal
        title={"Додати графік"}
        triger={isModalVisible}
        closeFn={closeModal}
        loading={isLoading}
        hideControls={true}
        error={error}
        hideErrorFn={() => setError(null)}
      >
        <div className="pb-4">
          <div className="flex items-center">
            <div
              className={`step ${
                activeStep === 1
                  ? "stepActive"
                  : activeStep > 1
                  ? "stepFinished"
                  : ""
              }`}
            >
              <span>1</span>
            </div>
            <div
              className={`stepSeparator ${
                activeStep > 1 ? "stepSeparatorFinished" : ""
              }`}
            >
              <div></div>
            </div>
            <div
              className={`step ${
                activeStep === 2
                  ? "stepActive"
                  : activeStep > 2
                  ? "stepFinished"
                  : ""
              }`}
            >
              <span>2</span>
            </div>
            <div
              className={`stepSeparator ${
                activeStep > 2 ? "stepSeparatorFinished" : ""
              }`}
            >
              <div></div>
            </div>
            <div className={`step ${activeStep === 3 ? "stepActive" : ""}`}>
              <span className="">
                <CheckCircleIcon
                  className={cn(
                    "w-6 h-6 text-gray-400",
                    activeStep === 3 &&
                      "text-white animate__animated animate__bounceIn"
                  )}
                />
              </span>
            </div>
          </div>

          {activeStep < 3 && (
            <div className="mt-4">
              <p className="text-center text-xl font-bold text-gray-900">
                Крок {activeStep}
              </p>
            </div>
          )}

          <div className={cn("mt-4 hidden", activeStep === 1 && "block")}>
            <div>
              <p className="text-sm text-gray-400 px-4 text-center">
                Оберіть дні, до яких потрібно створити графік
              </p>
            </div>
            <div className="mt-2">
              <Calendar
                options={{
                  multiselect: true,
                  disabledOldDays: true,
                  setSelectedDays,
                  disabledDays: disabledDays,
                }}
              />
            </div>
            <div className="mt-4 flex justify-center">
              <button
                className={cn(
                  "button w-full min-w-48",
                  selectedDays.length === 0 ? "disabled" : "dark"
                )}
                onClick={() => setActiveStep(activeStep + 1)}
                disabled={selectedDays.length === 0}
              >
                Далі
              </button>
            </div>
          </div>
          {/* STEP 2 */}
          <div className={cn("mt-4 hidden", activeStep === 2 && "block")}>
            <div>
              <p className="text-sm text-gray-400 px-4 text-center">
                Додайте години прийому
              </p>
            </div>
            <div>
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
                            className={`${
                              minutesValidation(el) ? "hidden" : ""
                            }`}
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
                                onClick={() => deleteScheduleItem(el)}
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
            <div className="mt-4 flex -mx-2">
              <div className="w-1/2 px-2">
                <button
                  className="button dark w-full"
                  onClick={() => setActiveStep(activeStep - 1)}
                >
                  Повернутися
                </button>
              </div>
              <div className="w-1/2 px-2">
                <button
                  className={cn(
                    "button w-full",
                    hoursList.length === 0 ? "disabled" : ""
                  )}
                  onClick={() => saveSchedule()}
                  disabled={hoursList.length === 0}
                >
                  Зберегти
                </button>
              </div>
            </div>
          </div>
          {/* STEP 3 */}
          <div className={cn("mt-4 hidden", activeStep === 3 && "block")}>
            <div>
              <div className="max-w-48 m-auto">
                <Lottie
                  lottieRef={lottieRef}
                  animationData={successAnimation}
                  loop={false}
                  autoplay={false}
                />
              </div>
              <p className="mt-4 text-2xl text-gray-700 px-4 text-center">
                Вітаємо!
              </p>
              <p className="text-gray-700 px-4 text-center">
                Ваш графік успішно створено
              </p>
            </div>
            <div className="mt-8">
              <button className="button w-full" onClick={() => closeModal()}>
                Закрити
              </button>
            </div>
          </div>
        </div>
      </BaseModal>
    </div>
  );
}
