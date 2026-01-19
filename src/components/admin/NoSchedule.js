import Image from "next/image";
import poster from "/public/no-day-schedule-admin.svg";

export default function NoSchedule() {
  return (
    <div className=" mt-10">
      <div className="flex justify-center bg-white">
        <Image
          src={poster}
          width={440}
          height={300}
          alt="NoSchedule"
          className="w-xs sm:w-md"
        />
      </div>

      <p className="my-8 text-lg text-center text-gray-400">
        Часи прийому не вказані!
      </p>
    </div>
  );
}
