import { cn } from "@/app/lib/cn";
import { NoImageIcon } from "./Icons";

export default function Thumbnail({ url, size = "sm" }) {
  let sizeStyles = "";
  let iconSizeStyles = "";
  switch (size) {
    case "xs":
      sizeStyles = "size-10";
      iconSizeStyles = "size-5";
      break;
    case "sm":
      sizeStyles = "size-12";
      iconSizeStyles = "size-6";
      break;
    case "md":
      sizeStyles = "size-14";
      iconSizeStyles = "size-7";
      break;
    case "lg":
      sizeStyles = "size-16";
      iconSizeStyles = "size-9";
      break;
  }

  return (
    <div
      className={cn(
        "flex justify-center items-center border-gray-800 border bg-gray-600 overflow-hidden rounded-full",
        sizeStyles
      )}
    >
      {url ? (
        <img
          className="max-w-full max-h-full"
          src={url}
          alt=""
          width={40}
          height={40}
        />
      ) : (
        <NoImageIcon className={iconSizeStyles} />
      )}
    </div>
  );
}
