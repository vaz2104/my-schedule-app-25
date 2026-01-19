import Image from "next/image";
import poster from "/public/no-history.svg";

export default function NoHistoryList() {
  return (
    <div className="mt-10">
      <div className="flex justify-center bg-white">
        <Image
          src={poster}
          alt="NoHistoryList"
          width={440}
          height={440}
          className="w-xs sm:w-md"
        />
      </div>

      <p className="my-4 text-lg text-center text-gray-400 ">
        Історія записів порожня!
      </p>
    </div>
  );
}
