import Image from "next/image";
import poster from "/public/no-services-admin.svg";

export default function NoServicesList() {
  return (
    <div className="mt-10">
      <div className="flex justify-center bg-white">
        <Image
          src={poster}
          alt="NoServicesList"
          width={440}
          height={440}
          className="w-xs sm:w-md"
        />
      </div>

      <p className="my-4 text-lg text-center text-gray-400 ">
        У Вас поки немає доданих послуг!
      </p>
    </div>
  );
}
