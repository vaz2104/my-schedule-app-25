import Image from "next/image";
import poster from "/public/no-history.svg";

export default function NoHistoryList() {
  return (
    <div className="mt-10">
      <div className="flex justify-center">
        <Image src={poster} alt="my icon" width={320} height={320} />
      </div>

      <p className="my-8 text-lg text-center text-gray-400 ">
        Історія записів порожня!
      </p>
    </div>
  );
}
