import Image from "next/image";
import poster from "/public/no-day-schedule-client.svg";

export default function NoSchedule() {
  return (
    <div className="text-center text-gray-400 mt-10">
      <div className="flex justify-center opacity-90">
        <Image
          src={poster}
          alt="my icon"
          width={440}
          height={440}
          className="max-w-full"
        />
      </div>

      <p className="mt-2">Жодних доступних місць для запису!</p>
    </div>
  );
}
