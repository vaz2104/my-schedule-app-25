import Image from "next/image";

export default function NoSchedule() {
  return (
    <div className="text-center text-gray-400 mt-10">
      <div className="flex justify-center">
        <Image
          src={"/no-appointments-modified copy.png"}
          width={320}
          height={222}
          alt=""
        />
      </div>

      <p className="my-8 text-lg">Часи прийому не вказані!</p>
    </div>
  );
}
