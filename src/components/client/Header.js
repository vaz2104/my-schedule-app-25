"use client";

import { CompanyService } from "@/services/CompanyService";
import { MapPinIcon, PhoneSolidIcon } from "../ui/Icons";
import Thumbnail from "../ui/Thumbnail";
import { useBaseURL } from "@/hooks/useBaseURL";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Spinner from "../ui/Spinner";
import Alert from "../ui/Alert";
import PhoneNumbersModal from "./PhoneNumbersModal";

export default function Header() {
  const [botData, setBotData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { basePlatformLink } = useBaseURL();
  const params = useParams();
  const pathname = usePathname();
  const disabledPages = ["client-history", "settings"];

  async function loadBotData() {
    const response = await CompanyService.getBot(params?.companyID);

    if (response.status !== 200) {
      setError("Сталася помилка при завантаженні даних");
    } else {
      setBotData(response.data);
    }

    setIsLoading(false);
  }

  function isHeaderDisabled() {
    let isDisabled = false;
    disabledPages.forEach((slug) => {
      if (pathname.split("/").includes(slug)) {
        if (!isDisabled) isDisabled = true;
      }
    });

    return isDisabled;
  }

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

  if (!isHeaderDisabled()) {
    return (
      <>
        {botData?.address && botData?.phoneNumbers?.length > 0 ? (
          <div className="relative flex p-4 justify-between items-center">
            <Link href={basePlatformLink} className="flex items-center">
              <div className="relative size-14 m-auto rounded-full border-4 border-white box-content">
                <Thumbnail url={botData?.avatar} size="md" theme="light" />
              </div>

              <div className="text-md font-bold text-center ml-1">
                {botData?.first_name}
              </div>
            </Link>
            <div className="pl-4 text-right">
              {botData?.address && (
                <div className="flex items-center text-gray-600">
                  <MapPinIcon className={"size-4 text-red-600"} />
                  <p className="text-sm ml-0.5">{botData?.address}</p>
                </div>
              )}
              {botData?.phoneNumbers?.length > 0 && (
                <div className="mt-1">
                  {botData?.phoneNumbers?.length === 1 ? (
                    <div className="flex justify-end">
                      <div className="">
                        <a
                          href={`tel:${botData?.phoneNumbers[0]}`}
                          className="flex items-center text-main"
                        >
                          <PhoneSolidIcon className={"w-5 h-5 text-gray-500"} />
                          <span className="ml-0.5 text-lg text-gray-500">
                            {botData?.phoneNumbers[0]}
                          </span>
                        </a>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-end mt-0.5">
                      <PhoneNumbersModal phoneNumbers={botData?.phoneNumbers} />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="relative flex p-4 justify-center">
            <Link href={basePlatformLink} className="">
              <div className="relative size-14 m-auto rounded-full border-4 border-white box-content">
                <Thumbnail url={botData?.avatar} size="md" theme="light" />
              </div>

              <div className="text-md font-bold text-center">
                {botData?.first_name}
              </div>
            </Link>
          </div>
        )}
      </>
    );
  }
}
