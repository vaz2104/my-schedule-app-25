import { CloseIcon } from "./Icons";
import Spinner from "./Spinner";

export default function ConfirmProccessModal({
  triger,
  children,
  cancelFn,
  confirmFn,
  loading,
  confirmBtnLabel,
  cancelBtnLabel,
}) {
  if (!triger) return <></>;

  return (
    <div
      id="popup-modal"
      className="bg-black/30 backdrop-blur-xs flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full h-[100%] max-h-full"
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow-sm overflow-hidden">
          {/* <!-- Modal loader layer --> */}
          {loading && (
            <div className="rounded-lg absolute top-0 right-0 bottom-0 left-0 bg-white/40 backdrop-blur-xs 75 z-50 flex justify-center items-center">
              <Spinner />
            </div>
          )}
          <button
            type="button"
            className="absolute top-4 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
            data-modal-hide="popup-modal"
            onClick={cancelFn || confirmFn}
            disabled={loading}
          >
            <CloseIcon className={"w-4 h-4"} />
          </button>
          <div className="p-4 md:p-5 text-center">
            <div className="my-8">{children}</div>

            <div className="flex -mx-1">
              <div className="mx-1 w-1/2">
                <button
                  data-modal-hide="popup-modal"
                  type="button"
                  className="button w-full min-w-48"
                  onClick={confirmFn}
                  disabled={loading}
                >
                  {confirmBtnLabel ? confirmBtnLabel : "Так"}
                </button>
              </div>
              <div className="mx-1 w-1/2">
                <button
                  data-modal-hide="popup-modal"
                  type="button"
                  className="button dark w-full"
                  onClick={cancelFn}
                  disabled={loading}
                >
                  {cancelBtnLabel ? cancelBtnLabel : "Ні, відмінити"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
