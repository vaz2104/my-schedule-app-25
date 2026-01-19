import Image from "next/image";
import poster from "/public/no-history.svg";

export default function NoHistoryList() {
  return (
    <div className="mt-10">
      <div className="flex justify-center opacity-90">
        <Image
          src={poster}
          alt="NoHistoryList"
          width={440}
          height={440}
          className="max-w-xs sm:max-w-max"
        />
      </div>

      <p className="my-8 text-lg text-center text-gray-400 ">
        Історія записів порожня!
      </p>
    </div>
  );
}
