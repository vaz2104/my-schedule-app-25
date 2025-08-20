import { create } from "zustand";

export const useCalendarStore = create((set) => ({
    initWeekDate: new Date(),
    initCalendarDate: new Date(),
    selectedDate: new Date(),
    weekDays: [],
    setInitWeekDate: (date) => set(() => ({ initWeekDate: date })),
    setInitCalendarDate: (date) => set(() => ({ initCalendarDate: date })),
    setSelectedDate: (date) => set(() => ({ selectedDate: date })),
    setWeekDays: (days) => set(() => ({ weekDays: days })),
    resetCalendarState: () =>
        set(() => ({
            initWeekDate: new Date(),
            initCalendarDate: new Date(),
            selectedDate: new Date(),
            weekDays: [],
        })),
}));
