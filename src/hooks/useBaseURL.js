"use client";
import { useEffect, useState } from "react";

export const useBaseURL = () => {
  const [activePanel, setActivePanel] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setActivePanel(localStorage.getItem("activePanel"));
    }
  }, []);

  const baseDashboardLink = `/dashboard/${activePanel}`;
  const basePlatformLink = `/panel/${activePanel}`;

  return { baseDashboardLink, basePlatformLink, activePanel };
};
