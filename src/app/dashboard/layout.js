"use client";
import FooterDashboard from "@/components/admin/FooterDashboard";
import HeaderDashboard from "@/components/admin/HeaderDashboard";
import { ThemeProvider } from "@/context/ThemeContext";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({ children }) {
  const params = useParams();

  async function miniAppEvents() {
    if (typeof window !== "undefined") {
      window.addEventListener("beforeunload", function () {
        // localStorage.removeItem("your_key");
        // Or clear all local storage: localStorage.clear();
        console.log("app closed");
        // localStorage.removeItem("activePanel");
        // localStorage.addItem("activePanel");
        localStorage.setItem("activePanel2", "botId");
      });
    }
  }

  useEffect(() => {
    miniAppEvents();
  }, []);
  return (
    <ThemeProvider>
      {!params?.companyID && <HeaderDashboard />}
      <div className="ms-full-creen mx-auto max-w-3xl">{children}</div>
      {!params?.companyID && <FooterDashboard />}
    </ThemeProvider>
  );
}
