import { create } from "zustand";

export const useAppStore = create((set) => ({
  companyPlan: null,
  botName: "",
  botThumbnail: "",
  themePalette: "",
  adminId: null,
  role: null,
  setCompanyPlan: (plan) => set(() => ({ companyPlan: plan })),
  setBotName: (name) => set(() => ({ botName: name })),
  setBotThumbnail: (thumbnail) => set(() => ({ botThumbnail: thumbnail })),
  setThemePalette: (palette) => set(() => ({ themePalette: palette })),
  setAdminId: (id) => set(() => ({ adminId: id })),
  setRole: (slug) => set(() => ({ role: slug })),
}));
