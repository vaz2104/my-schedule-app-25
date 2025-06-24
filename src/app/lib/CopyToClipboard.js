import { useCallback, useState } from "react";
import { CopyIcon } from "../components/ui/Icons";

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
      className={`${className} flex items-center text-gray-500 bg-gray-100 px-4 py-2 rounded-md hover:bg-gray-200 transition-all ${
        copied && "!bg-green-200 !text-green-700"
      }`}
    >
      <span className="w-4 h-4 block mr-2">
        <CopyIcon />
      </span>
      <span>{children ? children : copied ? "Скопійовано" : "Скопіювати"}</span>
    </button>
  );
}
