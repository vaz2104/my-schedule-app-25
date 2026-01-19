import Image from "next/image";
import poster from "/public/no-notifications.svg";

export default function NoNotifications() {
  return (
    <div className="mt-10">
      <div className="flex justify-center bg-white">
        <Image
          src={poster}
          alt="NoNotifications"
          width={320}
          height={320}
          className="w-xs sm:w-md"
        />
      </div>

      <p className="my-8 text-lg text-center text-gray-400">Події відсутні!</p>
    </div>
  );
}
