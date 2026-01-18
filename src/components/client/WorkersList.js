import Link from "next/link";
import Thumbnail from "../ui/Thumbnail";
import { CheckCircleIcon, ExclamationCircleIcon } from "../ui/Icons";

export default function WorkersList({ workers, baseURL }) {
  if (!workers?.length)
    return (
      <div className="p-4">
        <div className="text-center text-gray-400 mt-4">
          <p>Список працівників порожній</p>
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
                <div className="text-base font-semibold text-gray-900">
                  {worker?.workerId?.firstName || worker?.workerId?.username}
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
