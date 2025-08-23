import Link from "next/link";
import Thumbnail from "../ui/Thumbnail";

import { useBaseURL } from "@/hooks/useBaseURL";

export default function WorkersList({ workers }) {
  const { baseDashboardLink } = useBaseURL();
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
              href={`${baseDashboardLink}/specialists/${worker?._id}`}
              className="w-full mb-4 p-4 py-3 text-gray-900 rounded-lg shadow-sm bg-white border border-gray-50 flex items-center"
            >
              <Thumbnail url={worker?.workerId?.photoUrl} />
              <div className="ms-3 text-sm font-normal">
                <div className="text-base font-semibold text-gray-900 dark:text-white">
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
