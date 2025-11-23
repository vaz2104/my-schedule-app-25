import Link from "next/link";
import Thumbnail from "../ui/Thumbnail";
import { useAppStore } from "@/store/useAppStore";
import { CheckCircleIcon, ExclamationCircleIcon } from "../ui/Icons";

export default function WorkersList({ workers, baseURL }) {
  const { adminId, role } = useAppStore();
  if (!workers?.length)
    return (
      <div className="p-4">
        <div className="text-center text-gray-400 mt-4">
          <p>У Вас поки немає працівників, що під`єднані до бота</p>
        </div>
      </div>
    );

  return (
    <div>
      {workers.map((worker) => {
        return (
          <div key={worker?._id}>
            <Link
              href={`${baseURL}/specialists/${worker?.workerId?._id}`}
              className="flex items-center mb-4 p-4 py-3 text-gray-900 rounded-lg shadow-sm bg-white border border-gray-50 "
            >
              <Thumbnail url={worker?.workerId?.photoUrl} />
              <div className="ms-3 text-sm font-normal flex-1">
                <div className="text-base font-semibold text-gray-900 dark:text-white">
                  {adminId === worker?.workerId?._id ? (
                    <>Ви</>
                  ) : (
                    <>
                      {worker?.workerId?.firstName ||
                        worker?.workerId?.username}
                    </>
                  )}
                </div>
              </div>
              {role !== "worker" && (
                <>
                  {worker?.isBlocked ? (
                    <div className="ml-3 group flex items-center rounded-lg px-2 pr-1 py-1 text-sm font-medium text-red-600 bg-red-100">
                      <span className="text-sm mr-1 text-red-500">
                        Заблоковано
                      </span>
                      <ExclamationCircleIcon
                        className={"size-5 text-red-500"}
                      />
                    </div>
                  ) : (
                    <div className="ml-3 group flex items-center rounded-lg px-2 pr-1 py-1 text-sm font-medium text-green-600 bg-green-100">
                      <span className="text-sm mr-1 text-green-700">
                        Активний
                      </span>
                      <CheckCircleIcon className={"size-5 text-green-600"} />
                    </div>
                  )}
                </>
              )}
            </Link>
          </div>
        );
      })}
    </div>
  );
}
