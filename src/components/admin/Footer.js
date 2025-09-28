"use client";
import Link from "next/link";
import {
  BellIcon,
  BriefCaseIcon,
  CalendarIcon,
  HomeIcon,
  ProfileCardIcon,
  UserSettingsIcon,
  UsersGroupIcon,
} from "../ui/Icons";
import { useBaseURL } from "@/hooks/useBaseURL";
import { useAppStore } from "@/store/useAppStore";

export default function Footer() {
  const { companyPlan } = useAppStore();
  const { baseDashboardLink } = useBaseURL();

  return (
    <div className="fixed bottom-0 left-0 z-20 w-full px-4 py-4 bg-white ">
      <div className="footer-nav max-w-3xl mx-auto">
        <Link href={`${baseDashboardLink}/`} className="footer-nav-item">
          <div className="footer-nav-item__icon">
            <HomeIcon className={"size-8"} />
          </div>
          <div className="footer-nav-item__label">Головна</div>
        </Link>

        {companyPlan === "free" ? (
          <Link
            href={`${baseDashboardLink}/schedule`}
            className="footer-nav-item"
          >
            <div className="footer-nav-item__icon">
              {/* <UsersGroupIcon className={"size-9"} /> */}
              <CalendarIcon className={"size-8"} />
            </div>
            <div className="footer-nav-item__label">Графік</div>
          </Link>
        ) : (
          <Link
            href={`${baseDashboardLink}/specialists`}
            className="footer-nav-item"
          >
            <div className="footer-nav-item__icon">
              {/* <UsersGroupIcon className={"size-9"} /> */}
              <ProfileCardIcon className={"size-9"} />
            </div>
            <div className="footer-nav-item__label">Працівники</div>
          </Link>
        )}

        <Link href={`${baseDashboardLink}/clients`} className="footer-nav-item">
          <div className="footer-nav-item__icon">
            <UsersGroupIcon className={"size-9"} />
            {/* <CalendarIcon className={"size-8"} /> */}
          </div>
          <div className="footer-nav-item__label">Клієнти</div>
        </Link>
        <Link
          href={`${baseDashboardLink}/services`}
          className="footer-nav-item"
        >
          <div className="footer-nav-item__icon">
            <BriefCaseIcon className={"size-7"} />
          </div>
          <div className="footer-nav-item__label">Послуги</div>
        </Link>
        <Link href={`${baseDashboardLink}/events`} className="footer-nav-item">
          <div className="footer-nav-item__icon">
            <BellIcon className={"size-8"} />
          </div>
          <div className="footer-nav-item__label">Події</div>
        </Link>
        <Link
          href={`${baseDashboardLink}/settings`}
          className="footer-nav-item"
        >
          <div className="footer-nav-item__icon">
            <UserSettingsIcon className={"size-8"} />
          </div>
          <div className="footer-nav-item__label">Профіль</div>
        </Link>
      </div>
    </div>
  );
}
