"use client";
import Link from "next/link";
import {
  BellIcon,
  BriefCaseIcon,
  CalendarIcon,
  HomeIcon,
  UserSettingsIcon,
  UsersGroupIcon,
} from "../ui/Icons";
import { useBaseURL } from "@/hooks/useBaseURL";

export default function Footer() {
  const { baseDashboardLink } = useBaseURL();

  return (
    <div className="fixed bottom-0 left-0 z-20 w-full px-4 py-4 bg-white">
      <div className="footer-nav">
        <Link href={`${baseDashboardLink}/`} className="footer-nav-item">
          <div className="footer-nav-item__icon">
            <HomeIcon className={"size-8"} />
          </div>
          <div className="footer-nav-item__label">Головна</div>
        </Link>
        <Link
          href={`${baseDashboardLink}/specialists`}
          className="footer-nav-item"
        >
          <div className="footer-nav-item__icon">
            {/* <UsersGroupIcon className={"size-9"} /> */}
            <CalendarIcon className={"size-8"} />
          </div>
          <div className="footer-nav-item__label">Працівники</div>
        </Link>
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
      {/* <div className="flex">
        <div className="">
          <div className=""></div>
          <div className="">Головна</div>
        </div>
        <div className="">
          <div className=""></div>
          <div className="">Графік</div>
        </div>
        <div className="">
          <div className=""></div>
          <div className="">Події</div>
        </div>
        <div className="">
          <div className=""></div>
          <div className="">Профіль</div>
        </div>
      </div> */}
    </div>
  );
}
