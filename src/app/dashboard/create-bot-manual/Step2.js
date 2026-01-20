import Image from "next/image";
import React from "react";

export default function Step2({ toket, setToken }) {
  return (
    <div>
      <div className="mb-4">
        <p className="my-1 font-light text-gray-500 text-sm">
          Натисніть кнопку{" "}
          <span className="font-bold">&quot;Розпочати&quot;</span>
        </p>
      </div>

      <div className="">
        <Image
          src={"/manual-steps/manual-step-2.png"}
          width={609}
          height={144}
          className="m-auto"
          alt=""
        />
      </div>
    </div>
  );
}
