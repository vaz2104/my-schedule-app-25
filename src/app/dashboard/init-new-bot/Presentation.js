import BackButton from "@/components/ui/BackButton";
import Image from "next/image";
import poster from "/public/init-new-bot-poster.svg";

export default function Presentation({ toggleHint }) {
  return (
    <div className="px-4">
      <div className="my-4">
        <BackButton url={"/dashboard"} label={"Назад"} />
      </div>

      <div className="ms-container">
        <div className="py-8 sm:py-4 sm:h-screen flex flex-col justify-center">
          <div className="flex justify-center bg-white">
            <Image
              src={poster}
              width={440}
              height={340}
              alt="Presentation"
              className="w-xs sm:w-sm animate__animated animate__fadeIn"
            />
          </div>
          <div className="mt-8 font-light text-gray-500 sm:text-xl px-8 text-center animate__animated animate__fadeIn">
            Пройдіть лише 3 кроки, приєднайтеся до панелі, та отримайте власний
            телеграм бот з персональним графіком роботи
          </div>
          <div className="flex justify-center w-full py-6 animate__animated animate__slideInUp">
            <button className="button w-full" onClick={toggleHint}>
              Розпочати
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
