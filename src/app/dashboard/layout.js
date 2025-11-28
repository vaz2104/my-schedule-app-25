"use client";
import FooterDashboard from "@/components/admin/FooterDashboard";
import HeaderDashboard from "@/components/admin/HeaderDashboard";
import Spinner from "@/components/ui/Spinner";
import { ThemeProvider } from "@/context/ThemeContext";
import { updateUserSessionID } from "@/lib/updateUserSessionID";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardLayout({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();

  async function pageRendering() {
    setIsLoading(true);
    await updateUserSessionID();
    setIsLoading(false);
  }

  useEffect(() => {
    pageRendering();
  }, []);

  if (isLoading)
    return (
      <div className="py-4 flex justify-center items-center h-[100vh]">
        <Spinner />
      </div>
    );

  return (
    <ThemeProvider>
      {!params?.companyID && <HeaderDashboard />}
      <div className="ms-full-creen mx-auto max-w-3xl">{children}</div>
      {!params?.companyID && <FooterDashboard />}
    </ThemeProvider>
  );
}
