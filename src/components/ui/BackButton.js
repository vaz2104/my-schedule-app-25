"use client";
import { useRouter } from "next/navigation";
import { PrevArrowIcon } from "./Icons";

export default function BackButton({ url, label, handler }) {
  const router = useRouter();
  return (
    <button
      onClick={handler || (url ? () => router.push(url) : () => router.back())}
      className="button gray medium"
    >
      <PrevArrowIcon className={"w-6 h-6"} />
      <span>{label}</span>
    </button>
  );
}
