"use client";
import Thumbnail from "../ui/Thumbnail";
import Link from "next/link";
import { useBaseURL } from "@/hooks/useBaseURL";

export default function ClientCard({ id, name, thumbnail }) {
  const { baseDashboardLink } = useBaseURL();
  return (
    <Link
      href={`${baseDashboardLink}/clients/${id}`}
      className="w-full mb-4 p-4 py-3 text-gray-900 rounded-lg shadow-sm bg-white border border-gray-50 flex items-center"
    >
      <Thumbnail url={thumbnail} />
      <div className="ms-3 text-sm font-normal">
        <div className="text-base font-semibold text-gray-900 dark:text-white">
          {name}
        </div>
      </div>
    </Link>
  );
}
