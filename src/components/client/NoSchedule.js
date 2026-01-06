import Image from "next/image";

export default function NoSchedule() {
  return (
    <div className="text-center text-gray-400 mt-10">
      <div className="flex justify-center">
        <Image
          src={"/no-day-schedule-modified.png"}
          width={320}
          height={222}
          alt=""
        />
      </div>

      <p className="mt-2">Жодних доступних місць для запису!</p>
    </div>
  );
}
