import Alert from "../Alert";
import { cn } from "@/lib/cn";
import Spinner from "../Spinner";
import { CloseIcon } from "../Icons";

export default function BaseModal({
  triger,
  children,
  title,
  description = "",
  cancelFn,
  confirmFn,
  closeFn,
  hasConfirmButton = true,
  controlsTriger = false,
  hideControls = false,
  toggleControls = false,
  size, // sx | sm | md | lg | xl
  loading,
  error,
  hideErrorFn,
}) {
  const modalSize = size ? `max-w-${size}` : "";

  if (!triger) return <></>;

  return (
    <div
      id="authentication-modal"
      className="flex bg-black/50 backdrop-blur-xs overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 bottom-0 z-50 justify-center items-center w-full h-screen"
    >
      <div className={cn("relative p-4 w-full max-w-md max-h-full", modalSize)}>
        {/* <!-- Modal content --> */}
        <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
          {/* <!-- Modal loader layer --> */}
          {loading && (
            <div className="rounded-lg absolute top-0 right-0 bottom-0 left-0 bg-white/40 backdrop-blur-xs 75 z-50 flex justify-center items-center">
              <Spinner size="md" />
            </div>
          )}

          {error && (
            <div className="rounded-lg absolute top-0 right-0 bottom-0 left-0 bg-black/20 backdrop-blur-xs 75 z-50 flex justify-center items-center">
              <div className="p-4">
                <div className=" bg-white rounded-lg p-4">
                  <Alert type={"error"}>{error}</Alert>
                  {hideErrorFn && (
                    <button
                      type="button"
                      className="min-w-40 button m-auto"
                      onClick={hideErrorFn}
                      disabled={loading}
                    >
                      OK
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* <!-- Modal header --> */}
          <div
            className={cn(
              "flex items-center justify-between p-4 md:p-5 rounded-t"
            )}
          >
            {title && (
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white  pr-6">
                {title}
              </h3>
            )}

            <button
              type="button"
              className="absolute top-4 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="popup-modal"
              onClick={cancelFn || closeFn}
              disabled={loading}
            >
              <CloseIcon className={"w-4 h-4"} />
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          {/* <!-- Modal body --> */}
          <div className="p-4 pt-0">
            {description && (
              <div className="mt-4">
                <p className="flex mb-4 items-center text-sm font-normal text-gray-500 dark:text-gray-400">
                  {description}
                </p>
              </div>
            )}

            {children}

            {!hideControls && (
              <>
                {!toggleControls || (toggleControls && controlsTriger) ? (
                  <div className="flex mt-6 -mx-2">
                    {confirmFn && (
                      <button
                        type="submit"
                        className="w-full button mx-1"
                        onClick={confirmFn}
                        disabled={loading}
                      >
                        Зберегти
                      </button>
                    )}

                    {cancelFn && (
                      <button
                        type="button"
                        className="w-full button dark mx-1"
                        onClick={cancelFn}
                        disabled={loading}
                      >
                        Відмінити
                      </button>
                    )}

                    {closeFn && (
                      <button
                        type="button"
                        className="w-full button mx-1"
                        onClick={closeFn}
                        disabled={loading}
                      >
                        OK
                      </button>
                    )}
                  </div>
                ) : (
                  <></>
                )}
              </>
            )}
          </div>
        </div>
        <div className="h-4"></div>
      </div>
    </div>
  );
}
