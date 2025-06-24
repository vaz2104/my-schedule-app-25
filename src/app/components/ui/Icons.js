import { cn } from "@/app/lib/cn";

export const NoImageIcon = ({ className }) => {
  return (
    <svg
      aria-hidden="true"
      data-prefix="far"
      data-icon="image"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      className={cn("w-6 h-6 text-gray-300", className)}
    >
      <path
        fill="currentColor"
        d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm-6 336H54a6 6 0 0 1-6-6V118a6 6 0 0 1 6-6h404a6 6 0 0 1 6 6v276a6 6 0 0 1-6 6zM128 152c-22.091 0-40 17.909-40 40s17.909 40 40 40 40-17.909 40-40-17.909-40-40-40zM96 352h320v-80l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L192 304l-39.515-39.515c-4.686-4.686-12.284-4.686-16.971 0L96 304v48z"
      ></path>
    </svg>
  );
};

export const CopyIcon = ({ className }) => {
  return (
    <svg
      aria-hidden="true"
      data-prefix="fal"
      data-icon="copy"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
      className={cn("w-6 h-6 text-gray-300", className)}
    >
      <path
        fill="currentColor"
        d="M433.941 65.941l-51.882-51.882A48 48 0 0 0 348.118 0H176c-26.51 0-48 21.49-48 48v48H48c-26.51 0-48 21.49-48 48v320c0 26.51 21.49 48 48 48h224c26.51 0 48-21.49 48-48v-48h80c26.51 0 48-21.49 48-48V99.882a48 48 0 0 0-14.059-33.941zM352 32.491a15.88 15.88 0 0 1 7.431 4.195l51.882 51.883A15.885 15.885 0 0 1 415.508 96H352V32.491zM288 464c0 8.822-7.178 16-16 16H48c-8.822 0-16-7.178-16-16V144c0-8.822 7.178-16 16-16h80v240c0 26.51 21.49 48 48 48h112v48zm128-96c0 8.822-7.178 16-16 16H176c-8.822 0-16-7.178-16-16V48c0-8.822 7.178-16 16-16h144v72c0 13.2 10.8 24 24 24h72v240z"
        className=""
      ></path>
    </svg>
  );
};
export const PrevArrowIcon = ({ className }) => {
  return (
    <svg
      className={cn("w-4 h-4 rtl:rotate-180", className)}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="m15 19-7-7 7-7"
      />
    </svg>
  );
};

export const NextArrowIcon = ({ className }) => {
  return (
    <svg
      className={cn("w-4 h-4 rtl:rotate-180", className)}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="m9 5 7 7-7 7"
      />
    </svg>
  );
};
