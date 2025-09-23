"use client";
import { ThemeProvider } from "@/context/ThemeContext";

export default function DashboardLayout({ children }) {
  return (
    <ThemeProvider>
      <div className="ms-full-creen mx-auto max-w-3xl">{children}</div>
    </ThemeProvider>
  );
}
