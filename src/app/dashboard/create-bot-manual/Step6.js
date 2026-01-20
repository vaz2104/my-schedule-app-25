import Image from "next/image";
import React from "react";

export default function Step6({ toket, setToken }) {
  return (
    <div>
      <div className="mb-4">
        <p className="my-1 font-light text-gray-500 text-sm">
          Такий вигляд має мати коректно заповнена форма
        </p>
        <p className="my-1 font-light text-gray-500 text-sm">
          Після введення всіх даних натисніть кнопку{" "}
          <span className="font-bold">&quot;Create Bot&quot;</span>
        </p>
      </div>

      <div className="">
        <Image
          src={"/manual-steps/manual-step-6.png"}
          width={609}
          height={144}
          className="m-auto"
          alt=""
        />
      </div>
    </div>
  );
}
