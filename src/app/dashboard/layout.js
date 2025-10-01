"use client";
import FooterDashboard from "@/components/admin/FooterDashboard";
import HeaderDashboard from "@/components/admin/HeaderDashboard";
import { ThemeProvider } from "@/context/ThemeContext";
import { useParams } from "next/navigation";

export default function DashboardLayout({ children }) {
  const params = useParams();
  return (
    <ThemeProvider>
      {!params?.companyID && <HeaderDashboard />}
      <div className="ms-full-creen mx-auto max-w-3xl">{children}</div>
      {!params?.companyID && <FooterDashboard />}
    </ThemeProvider>
  );
}
