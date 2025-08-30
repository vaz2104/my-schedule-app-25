"use client";
import { ThemeProvider } from "@/context/ThemeContext";

export default function PanelRootLayout({ children }) {
  return (
    <ThemeProvider>
      <div className="ms-full-creen">{children}</div>
    </ThemeProvider>
  );
}
