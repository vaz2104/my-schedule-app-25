import { cn } from "@/lib/cn";

export default function ClientCard() {
  return (
    <div>
      <div className="w-full mb-4 p-4 text-gray-900 rounded-lg shadow-sm bg-white border border-gray-50">
        <div className="flex items-center">
          <div
            className={cn(
              "relative inline-block shrink-0 w-12 h-12  border-2 border-gray-200 rounded-full"
            )}
          >
            <img
              src={
                "https://doodleipsum.com/700x700/avatar?i=310c74837ffe0803164ed110256826e1"
              }
              className="w-12 h-12 rounded-full"
              alt="Jese Leos image"
            />
          </div>
          <div className="ms-3 text-sm font-normal">
            <div className="text-base font-semibold text-gray-900 dark:text-white">
              Bonnie Green
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
