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
import { useAppStore } from "@/store/useAppStore";

export default function Footer() {
  const { companyPlan } = useAppStore();
  const { basePlatformLink } = useBaseURL();

  return (
    <div className="fixed bottom-0 left-0 z-20 w-full px-4 py-4 bg-white">
      <div className="footer-nav client-nav max-w-3xl m-auto">
        <Link href={`${basePlatformLink}/`} className="footer-nav-item">
          <div className="footer-nav-item__icon">
            <HomeIcon className={"size-8"} />
          </div>
          <div className="footer-nav-item__label">Головна</div>
        </Link>

        {companyPlan === "free" || companyPlan === "basic" ? (
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
