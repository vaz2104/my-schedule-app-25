import { CloseIcon } from "./Icons";
import Lottie from "lottie-react";
import successAnimation from "@/lib/success-animation.json";
import Spinner from "./Spinner";

export default function SuccessModal({
  triger,
  children,
  title,
  cancelFn,
  confirmFn,
  loading,
}) {
  if (!triger) return <></>;
  return (
    <div
      id="popup-modal"
      className="bg-black/30 backdrop-blur-xs flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full h-[100%] max-h-full"
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700 overflow-hidden">
          {loading && (
            <div className="rounded-lg absolute top-0 right-0 bottom-0 left-0 bg-white/40 backdrop-blur-xs 75 z-50 flex justify-center items-center">
              <Spinner size="md" />
            </div>
          )}
          <button
            type="button"
            className="absolute top-4 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="popup-modal"
            onClick={cancelFn || confirmFn}
            disabled={loading}
          >
            <CloseIcon className={"w-4 h-4"} />
            <span className="sr-only">Close modal</span>
          </button>
          <div className="p-4 md:p-5 text-center">
            <div className="mb-8">
              <div className="m-auto w-38 my-4">
                <Lottie animationData={successAnimation} loop={false} />
              </div>
              {children || (
                <h3
                  className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400"
                  dangerouslySetInnerHTML={{ __html: title }}
                />
              )}
            </div>

            <div className="flex items-center mt-8">
              <div className="flex-1">
                <button
                  type="button"
                  className="button w-full min-w-48"
                  onClick={confirmFn}
                  disabled={loading}
                >
                  Ok
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
