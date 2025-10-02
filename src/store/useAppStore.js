import { create } from "zustand";

export const useAppStore = create((set) => ({
  companyPlan: null,
  botName: "",
  themePalette: "",
  adminId: null,
  setCompanyPlan: (plan) => set(() => ({ companyPlan: plan })),
  setbBotName: (name) => set(() => ({ botName: name })),
  setThemePalette: (palette) => set(() => ({ themePalette: palette })),
  setAdminId: (id) => set(() => ({ adminId: id })),
}));
