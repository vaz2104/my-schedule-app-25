import Image from "next/image";
import poster from "/public/no-services-client.svg";

export default function NoServicesList() {
  return (
    <div className="mt-10">
      <div className="flex justify-center opacity-90">
        <Image
          src={poster}
          alt="my icon"
          width={440}
          height={440}
          className="max-w-xs sm:max-w-max"
        />
      </div>

      <p className="my-4 text-lg text-center text-gray-400 ">
        Жодних доступних послуг!
      </p>
    </div>
  );
}
