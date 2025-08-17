"use client";
import { cn } from "@/app/lib/cn";
import { CopyIcon } from "./Icons";
import { useCallback, useState } from "react";

export default function CopyToClipboard({ text, onCopy, children, className }) {
  const [copied, setCopied] = useState(false);

  const copyFn = useCallback(async (text) => {
    if (!navigator?.clipboard) {
      console.warn("Clipboard not supported");
      return false;
    }

    try {
      await navigator.clipboard.writeText(text);
      if (typeof onCopy !== "undefined") onCopy();
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, [4000]);
      return true;
    } catch (error) {
      console.warn("Copy failed", error);
      return false;
    }
  }, []);

  return (
    <button
      onClick={() => copyFn(text)}
      className={cn(
        "button dark flex items-center text-md mt-4 transition-all w-full border border-transparent",
        className,
        copied && "!bg-green-200 !text-green-700 border border-green-600"
      )}
    >
      <span className="block mr-2">
        <CopyIcon
          className={cn("w-4 h-4 text-white", copied && "text-green-700")}
        />
      </span>
      <span>{children ? children : copied ? "Скопійовано" : "Скопіювати"}</span>
    </button>
  );
}
