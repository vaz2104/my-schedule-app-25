"use client";
import { useEffect, useState } from "react";

export const useBaseURL = () => {
  const [activePanel, setActivePanel] = useState("");
  const [baseDashboardLink, setBaseDashboardLink] = useState("");
  const [basePlatformLink, bsetBasePlatformLink] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const panelId = localStorage.getItem("activePanel");

      setActivePanel(panelId);
      setBaseDashboardLink(`/dashboard/${panelId}`);
      bsetBasePlatformLink(`/panel/${panelId}`);
    }
  }, []);

  return { baseDashboardLink, basePlatformLink, activePanel };
};
