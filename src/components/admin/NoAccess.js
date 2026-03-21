import Image from "next/image";
import poster from "/public/account-closed-access.svg";

export default function NoAccess({ text }) {
  return (
    <div className="mt-10 ">
      <div className="flex justify-center bg-white">
        <Image
          src={poster}
          alt="NoAccess"
          width={320}
          height={320}
          className="w-xs sm:w-md"
        />
      </div>

      <p className="text-lg sm:text-xl text-center text-red-500 mb-16">
        {text ||
          "У Вас закінчилась підписка! Будь ласка, підключіть тарифний план, аби отримати доступ до всіх функцій панелі"}
      </p>
    </div>
  );
}
