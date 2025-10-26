import { LockIcon } from "../ui/Icons";

export default function BlockStatus({ hasLabel = true }) {
  return (
    <div className="flex items-center">
      {hasLabel && (
        <span className="mr-0.5 text-red-500 text-sm">Заблоковано</span>
      )}
      <LockIcon className={"size-5 text-red-500"} />
    </div>
  );
}
