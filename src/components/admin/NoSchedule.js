import Image from "next/image";
import poster from "/public/no-day-schedule-admin.svg";

export default function NoSchedule() {
  return (
    <div className="text-center text-gray-400 mt-10">
      <div className="flex justify-center">
        <Image
          src={poster}
          width={440}
          height={300}
          alt=""
          className="max-w-sm"
        />
      </div>

      <p className="my-8 text-lg">Часи прийому не вказані!</p>
    </div>
  );
}
