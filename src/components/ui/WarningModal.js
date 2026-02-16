import { CloseIcon } from "./Icons";
import Lottie from "lottie-react";
import errorAnimation from "@/lib/error-animation.json";
import { useRef } from "react";

export default function WarningModal({
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
      <div className="relative p-4 w-full max-w-sm max-h-full">
        <div className="relative bg-white rounded-lg shadow-sm overflow-hidden">
          <button
            type="button"
            className="absolute top-4 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
            data-modal-hide="popup-modal"
            onClick={cancelFn || confirmFn}
            disabled={loading}
          >
            <CloseIcon className={"w-4 h-4"} />
            <span className="sr-only">Close modal</span>
          </button>
          <div className="p-4 md:p-5 text-center">
            <div className="mb-8">
              <div className="m-auto w-24">
                <Lottie animationData={errorAnimation} loop={false} />
              </div>
              {children || (
                <h3
                  className="text-center mb-8 mt-4 font-normal text-gray-500"
                  dangerouslySetInnerHTML={{ __html: title }}
                />
              )}
            </div>

            <button className="button red m-auto min-w-48" onClick={confirmFn}>
              Ok
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
