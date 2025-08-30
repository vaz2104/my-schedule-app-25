"use client";

import { CompanyService } from "@/services/CompanyService";
import { BadgeCheckIcon, LogOutIcon } from "../ui/Icons";
import Thumbnail from "../ui/Thumbnail";
import { useBaseURL } from "@/hooks/useBaseURL";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Spinner from "../ui/Spinner";
import Alert from "../ui/Alert";

export default function Header() {
  const [botData, setBotData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { basePlatformLink } = useBaseURL();
  const parans = useParams();

  async function loadBotData() {
    const response = await CompanyService.getBot(parans?.companyID);

    if (response.status !== 200) {
      setError("Сталася помилка при завантаженні даних");
    } else {
      setBotData(response.data);
    }

    setIsLoading(false);
  }

  // console.log(botData);

  useEffect(() => {
    loadBotData();
  }, []);

  if (isLoading)
    return (
      <div className="fixed bottom-0 left-0 z-20 w-full px-4 py-4 bg-white flex justify-center items-center">
        <Spinner />
      </div>
    );

  if (error) {
    return (
      <div className="fixed bottom-0 left-0 z-20 w-full px-4 py-4 bg-white flex justify-center items-center">
        <Alert className={"w-full"}>{error}</Alert>
      </div>
    );
  }

  return (
    <div className="fixed top-0 left-0 w-full px-4 bg-gray-50 z-30">
      <div className="flex justify-between items-center py-3">
        <Link href={basePlatformLink} className="flex items-center">
          <div className="relative">
            <Thumbnail url={botData?.avatar} size="xs" theme="light" />
          </div>

          <div className="ml-2 text-md font-bold">{botData?.first_name}</div>
        </Link>
      </div>
    </div>
  );
}
