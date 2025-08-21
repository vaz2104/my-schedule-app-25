import Lottie from "lottie-react";
import successAnimation from "@/lib/success-animation.json";

export default function Step4({ lottieRef }) {
  return (
    <div className="mt-6">
      <div className="max-w-48 m-auto">
        <Lottie
          lottieRef={lottieRef}
          animationData={successAnimation}
          loop={false}
          // autoplay={false}
        />
      </div>
      <p className="mt-4 text-2xl text-gray-700 px-4 text-center">Вітаємо!</p>
      <p className="mt-1 text-gray-700 px-4 text-center">
        Ваш бот налаштовано!
      </p>
      <p className="mt-2 text-gray-400 px-4 text-center">
        Переходьте в панель та заповнюйте свій робочий графік
      </p>
    </div>
  );
}
