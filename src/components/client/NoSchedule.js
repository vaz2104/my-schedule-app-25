import Image from "next/image";
import poster from "/public/no-day-schedule-client.svg";

export default function NoSchedule() {
  return (
    <div className="mt-10">
      <div className="flex justify-center bg-white">
        <Image
          src={poster}
          alt="my icon"
          width={440}
          height={440}
          className="w-xs sm:w-md"
        />
      </div>

      <p className="mt-2 text-center text-gray-500 text-lg">
        Жодних доступних місць для запису!
      </p>
    </div>
  );
}
