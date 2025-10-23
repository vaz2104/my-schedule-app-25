"use client";
import Link from "next/link";
import {
  BriefCaseIcon,
  CalendarIcon,
  ClockArrowIcon,
  HomeIcon,
  ProfileCardIcon,
  UserSettingsIcon,
} from "../ui/Icons";
import { useBaseURL } from "@/hooks/useBaseURL";
import { useEffect, useState } from "react";
import { CompanyService } from "@/services/CompanyService";
import Alert from "../ui/Alert";
import Spinner from "../ui/Spinner";
import { useParams } from "next/navigation";

export default function Footer() {
  const { basePlatformLink } = useBaseURL();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [company, setCompany] = useState(null);
  const params = useParams();

  async function loadCompanyData() {
    setIsLoading(true);
    const companyDataResponse = await CompanyService.getBot(params?.companyID);

    if (companyDataResponse.status !== 200) {
      setError("Сталася помилка при завантаженні даних");
    } else {
      setCompany(companyDataResponse.data);
    }

    setIsLoading(false);
  }

  useEffect(() => {
    loadCompanyData();
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
    <div className="fixed bottom-0 left-0 z-20 w-full px-4 py-4 bg-white">
      <div className="footer-nav client-nav">
        <Link href={`${basePlatformLink}/`} className="footer-nav-item">
          <div className="footer-nav-item__icon">
            <HomeIcon className={"size-8"} />
          </div>
          <div className="footer-nav-item__label">Головна</div>
        </Link>

        {company?.plan === "free" ? (
          <Link
            href={`${basePlatformLink}/schedule`}
            className="footer-nav-item"
          >
            <div className="footer-nav-item__icon">
              <CalendarIcon className={"size-8"} />
            </div>
            <div className="footer-nav-item__label">Графік</div>
          </Link>
        ) : (
          <Link
            href={`${basePlatformLink}/specialists`}
            className="footer-nav-item"
          >
            <div className="footer-nav-item__icon">
              <ProfileCardIcon className={"size-9"} />
            </div>
            <div className="footer-nav-item__label">Працівники</div>
          </Link>
        )}
        <Link href={`${basePlatformLink}/services`} className="footer-nav-item">
          <div className="footer-nav-item__icon">
            <BriefCaseIcon className={"size-7"} />
          </div>
          <div className="footer-nav-item__label">Послуги</div>
        </Link>
        <Link
          href={`${basePlatformLink}/client-history`}
          className="footer-nav-item"
        >
          <div className="footer-nav-item__icon">
            <ClockArrowIcon className={"size-8"} />
          </div>
          <div className="footer-nav-item__label">Історія</div>
        </Link>

        <Link href={`${basePlatformLink}/settings`} className="footer-nav-item">
          <div className="footer-nav-item__icon">
            <UserSettingsIcon className={"size-8"} />
          </div>
          <div className="footer-nav-item__label">Профіль</div>
        </Link>
      </div>
    </div>
  );
}
