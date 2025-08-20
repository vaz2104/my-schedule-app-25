import Alert from "../Alert";
import { cn } from "@/lib/cn";
import Spinner from "../Spinner";
import { CloseIcon } from "../Icons";
import Calendar from "./Calendar";

export default function CalendarModal({
  triger,
  closeFn,
  size, // sx | sm | md | lg | xl
  loading,
  error,
}) {
  const modalSize = size ? `max-w-${size}` : "";

  if (!triger) return <></>;

  return (
    <div className="flex bg-black/50 backdrop-blur-xs overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[100%] max-h-full">
      <div className={cn("relative p-4 w-full max-w-md max-h-full", modalSize)}>
        {/* <!-- Modal content --> */}
        <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
          {/* <!-- Modal loader layer --> */}
          {loading && (
            <div className="rounded-lg absolute top-0 right-0 bottom-0 left-0 bg-white/40 backdrop-blur-xs 75 z-50 flex justify-center items-center">
              <Spinner size="md" />
            </div>
          )}
          <div
            className={cn(
              "flex items-center justify-between p-4 md:p-5 rounded-t"
            )}
          >
            <button
              type="button"
              className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={closeFn}
              disabled={loading}
            >
              <CloseIcon />
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          <div className="p-4 mt-4">
            <Calendar />
          </div>
        </div>
      </div>
    </div>
  );
}
