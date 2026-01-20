import Image from "next/image";
import React from "react";

export default function Step1({ toket, setToken }) {
  return (
    <div>
      <div className="mb-4">
        <p className="my-1 font-light text-gray-500 text-sm">
          Зайдіть в телеграм та знайдіть в пошуку
          <a
            target="_blunk"
            href="https://t.me/botfather"
            className="text-main font-bold underline mx-1"
          >
            @BotFather
          </a>
          (або перейдіть за цим посиланням)
        </p>
      </div>

      <div className="">
        <Image
          src={"/manual-steps/manual-step-1.png"}
          width={609}
          height={144}
          className="m-auto w-84"
          alt=""
        />
      </div>
    </div>
  );
}
