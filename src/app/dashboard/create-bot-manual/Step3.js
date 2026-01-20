import Image from "next/image";
import React from "react";

export default function Step3({ toket, setToken }) {
  return (
    <div>
      <div className="mb-10">
        <p className="my-1 font-light text-gray-500 text-sm">
          Біля поля вводу повідомлення натисніть на кнопку{" "}
          <span className="font-bold">&quot;Open&quot;</span>
        </p>
      </div>

      <div className="">
        <Image
          src={"/manual-steps/manual-step-3.png"}
          width={609}
          height={144}
          className="m-auto"
          alt=""
        />
      </div>
    </div>
  );
}
