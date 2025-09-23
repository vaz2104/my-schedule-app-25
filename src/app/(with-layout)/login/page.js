"use client";
import LoginLayout from "../../../components/general/_login/LoginLayout";
import { ThemeProvider } from "@/context/ThemeContext";

export default function LoginPage() {
  return (
    <ThemeProvider>
      <LoginLayout />
    </ThemeProvider>
  );
}
