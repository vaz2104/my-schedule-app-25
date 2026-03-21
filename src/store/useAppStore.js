import { create } from "zustand";

export const useAppStore = create((set) => ({
  companyPlan: null,
  subscriptionStatus: false,
  subscriptionEndDate: null,
  botName: "",
  botThumbnail: "",
  themePalette: "",
  adminId: null,
  role: null,
  setCompanyPlan: (plan) => set(() => ({ companyPlan: plan })),
  setSubscriptionStatus: (status) =>
    set(() => ({ subscriptionStatus: status })),
  setSubscriptionEndDate: (date) => set(() => ({ subscriptionEndDate: date })),
  setBotName: (name) => set(() => ({ botName: name })),
  setBotThumbnail: (thumbnail) => set(() => ({ botThumbnail: thumbnail })),
  setThemePalette: (palette) => set(() => ({ themePalette: palette })),
  setAdminId: (id) => set(() => ({ adminId: id })),
  setRole: (slug) => set(() => ({ role: slug })),
}));
