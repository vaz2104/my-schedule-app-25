import Image from "next/image";
import React from "react";

export default function Step4({ toket, setToken }) {
  return (
    <div>
      <div className="mb-10">
        <p className="my-1 font-light text-gray-500 text-sm">
          Аби відкрити форму створення новго боту натисніть на кнопку{" "}
          <span className="font-bold">&quot;Create a New Bot&quot;</span>
        </p>
      </div>

      <div className="">
        <Image
          src={"/manual-steps/manual-step-4.png"}
          width={609}
          height={144}
          className="m-auto"
          alt=""
        />
      </div>
    </div>
  );
}
