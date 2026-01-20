import Image from "next/image";
import React from "react";

export default function Step5({ toket, setToken }) {
  return (
    <div>
      <ol className="relative text-gray-500 border-s border-gray-200 ml-3">
        <li className="mb-10 ms-6">
          <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white">
            1
          </span>
          <div className="pt-0.5">
            <p className="my-1 font-light text-gray-500 text-sm">
              Додайте аватарку для Вашого бота, аби краще привертати увагу та
              бути візуально привабливішим
            </p>
          </div>
        </li>
        <li className="mb-10 ms-6">
          <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white">
            2
          </span>
          <div className="pt-0.5">
            <p className="my-1 font-light text-gray-500 text-sm">
              Додайте назву Вашого бота.
            </p>
            <p className="my-1 font-light text-gray-500 text-sm">
              Наприклад: &quot;Салон Краси Eva&quot;
            </p>
          </div>
        </li>
        <li className="mb-10 ms-6">
          <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white">
            3
          </span>
          <div className="pt-0.5">
            <p className="my-1 font-light text-gray-500 text-sm">
              Додайте короткий опис.
            </p>
            <p className="my-1 font-light text-gray-500 text-sm">
              Наприклад: &quot;Студія манікюру в Києві! Майстри преміум класу!
              Якісно та стерильно! Ви залишитеся задоволені! &quot;
            </p>
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
            <p className="my-1 font-light text-gray-500 text-sm">
              Наприклад:{" "}
              <span className="font-bold">&quot;EvaBeautySalonBot&quot;</span>{" "}
              або{" "}
              <span className="font-bold">&quot;EvaBeautySalon_bot&quot;</span>
            </p>
          </div>
        </li>
      </ol>

      <div className="">
        <Image
          src={"/manual-steps/manual-step-5.png"}
          width={609}
          height={144}
          className="m-auto"
          alt=""
        />
      </div>
    </div>
  );
}
