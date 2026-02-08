import { cn } from "@/lib/cn";

export default function Alert({ type = "error", children, className }) {
  let classes = "";

  switch (type) {
    case "error":
      classes = "bg-red-100 text-red-800";
      break;
    case "warning":
      classes = "bg-yellow-100 text-yellow-800";
      break;
    case "success":
      classes = "bg-green-50 text-green-800";
      break;
    case "default":
      classes = "bg-gray-100 text-gray-800";
      break;
    case "info":
      classes = "bg-blue-50 text-blue-800";
      break;
  }

  return (
    <div
      className={cn(
        "flex items-center p-4 text-sm rounded-lg",
        classes,
        className,
      )}
      role="alert"
    >
      <InforIcon />
      <div>{children}</div>
    </div>
  );
}

const InforIcon = () => {
  return (
    <svg
      className="shrink-0 inline w-4 h-4 me-3"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
    </svg>
  );
};
