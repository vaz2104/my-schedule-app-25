import Image from "next/image";

export default function Presentation({ toggleHint }) {
  return (
    <div className="ms-container">
      <div className=" p-4 h-screen flex flex-col justify-center">
        <Image
          src={"/init-new-bot-poster.png"}
          width={650}
          height={500}
          className="animate__animated animate__fadeIn max-w-md mx-auto"
          alt=""
        />
        <div className="mt-8 font-light text-gray-500 sm:text-xl dark:text-gray-400 px-8 text-center animate__animated animate__fadeIn">
          Пройдіть лише 3 кроки та отримайте власний телеграм бот з персональним
          графіком роботи
        </div>
        <div className="flex justify-center w-full py-6 animate__animated animate__slideInUp">
          <button className="button w-full" onClick={toggleHint}>
            Розпочати
          </button>
        </div>
      </div>
    </div>
  );
}
