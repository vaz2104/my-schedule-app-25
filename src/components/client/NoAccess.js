import Image from "next/image";
import poster from "/public/panel-no-access.svg";

export default function NoAccess({ text }) {
  return (
    <div className="mt-10">
      <div className="flex justify-center bg-white">
        <Image
          src={poster}
          alt="NoAccess"
          width={320}
          height={320}
          className="w-xs sm:w-md"
        />
      </div>

      <p className="text-lg sm:text-xl text-center text-gray-400 mb-16">
        {text || "Вибаче, наразі доступ до графіку роботи закритий!"}
      </p>
    </div>
  );
}
