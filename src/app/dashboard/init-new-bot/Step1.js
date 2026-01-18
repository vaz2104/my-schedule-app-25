import Image from "next/image";
import React from "react";

export default function Step1({ toket, setToken }) {
  return (
    <div>
      <ol className="relative text-gray-500 border-s border-gray-200 ml-3">
        <li className="mb-10 ms-6">
          <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white">
            1
          </span>
          <div className="pt-0.5">
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
            <div className="shadow-md my-4 border border-gray-100 rounded-sm overflow-hidden">
              <Image
                src={"/init-1-steps/init-step-1.png"}
                width={609}
                height={144}
                className="m-auto"
                alt=""
              />
            </div>
          </div>
        </li>
        <li className="mb-10 ms-6">
          <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white">
            2
          </span>
          <div className="pt-0.5">
            <p className="my-1 font-light text-gray-500 text-sm">
              Відкрийте бот, виберіть зі списку, або натисніть в меню команду{" "}
              <span className="text-black font-bold">/newbot</span>
            </p>
            <div className="my-4">
              <div className="shadow-md border border-gray-100 rounded-sm overflow-hidden">
                <Image
                  src={"/init-1-steps/init-step-2.png"}
                  width={609}
                  height={144}
                  className="m-auto"
                  alt=""
                />
              </div>
              <p className="text-center font-bold my-3 text-sm">або</p>
              <div className="shadow-md border border-gray-100 rounded-sm overflow-hidden">
                <Image
                  src={"/init-1-steps/init-step-22.png"}
                  width={609}
                  height={144}
                  className="m-auto"
                  alt=""
                />
              </div>
            </div>
          </div>
        </li>
        <li className="mb-10 ms-6">
          <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white">
            3
          </span>
          <div className="pt-0.5">
            <p className="my-1 font-light text-gray-500 text-sm">
              Придумайте назву для свого бота <br />
            </p>
            <div className="my-4 shadow-md border border-gray-100 rounded-sm overflow-hidden">
              <Image
                src={"/init-1-steps/init-step-3.png"}
                width={609}
                height={144}
                className="m-auto"
                alt=""
              />
            </div>
          </div>
        </li>
        <li className="mb-10 ms-6">
          <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white">
            4
          </span>
          <div className="pt-0.5">
            <p className="my-1 font-light text-gray-500 text-sm">
              Придумайте <span className="text-black font-bold">username</span>{" "}
              (має закінчуватися словом{" "}
              <span className="text-black font-bold">‘bot’</span>) <br />
            </p>
            <div className="my-4 shadow-md border border-gray-100 rounded-sm overflow-hidden">
              <Image
                src={"/init-1-steps/init-step-4.png"}
                width={609}
                height={144}
                className="m-auto"
                alt=""
              />
            </div>
          </div>
        </li>
        <li className="ms-6">
          <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white">
            5
          </span>
          <div className="pt-1.5">
            <p className="font-light text-gray-500 text-sm">
              Скопіюйте ваш персональний ключ (виділений червоним) в поле, яке
              знаходиться нижче
            </p>
            <div className="my-4 shadow-md border border-gray-100 rounded-sm overflow-hidden">
              <Image
                src={"/init-1-steps/init-step-5.png"}
                width={609}
                height={144}
                className="m-auto"
                alt=""
              />
            </div>
          </div>
        </li>
      </ol>

      <div className="w-full mt-8">
        <label htmlFor="token" className="input-label !font-bold">
          Введіть Ваш токен
        </label>
        <input
          type="text"
          id="token"
          className="input"
          placeholder="Введіть тут..."
          onChange={(event) => setToken(event.target.value)}
          value={toket}
        />
      </div>
    </div>
  );
}
