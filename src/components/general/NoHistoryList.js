import Image from "next/image";

export default function NoHistoryList() {
  return (
    <div className="mt-10">
      <div className="flex justify-center">
        <Image
          src={"/no-history-poster-modified.png"}
          width={320}
          height={320}
          alt=""
          className="max-w-xs"
        />
      </div>

      <p className="my-8 text-lg text-center text-gray-400 ">
        Історія записів порожня!
      </p>
    </div>
  );
}
