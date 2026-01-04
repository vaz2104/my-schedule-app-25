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
    <div className="fixed top-0 left-0 w-full px-4 z-30">
      <div className="absolute w-full h-full top-0 left-0 bg-white blur-xl"></div>
      <div className="relative flex justify-center py-3 max-w-3xl m-auto">
        <div className="absolute h-14 bg-main w-full top-0 rounded-b-2xl "></div>
        <Link href={basePlatformLink} className="">
          <div className="relative size-16 m-auto rounded-full border-4 border-white box-content shadow-2xl">
            <Thumbnail url={botData?.avatar} size="lg" theme="light" />
          </div>

          <div className="mt-1 text-md font-bold text-center">
            {botData?.first_name}
          </div>
        </Link>
      </div>
    </div>
  );
}
