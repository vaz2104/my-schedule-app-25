import Link from "next/link";

export default function NewBotButton() {
  return (
    <div className="my-4 ms-container">
      <Link
        href={"/dashboard/init-new-bot"}
        className="flex items-center justify-center border rounded-md px-4 py-2 max-w-80 w-full mx-auto button-bg-light"
      >
        <span className="text-4xl transition-all">+</span>
        <span className="ml-4 font-bold transition-all">Підключити бот </span>
      </Link>
    </div>
  );
}
