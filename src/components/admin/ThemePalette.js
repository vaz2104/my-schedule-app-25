import { CheckCircleIcon } from "@/components/ui/Icons";
import Spinner from "../ui/Spinner";
import { useParams } from "next/navigation";
import { useContext, useState } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import { CompanyService } from "@/services/CompanyService";

export default function ThemePalette({ activePalette, successCallback }) {
  const { setSuccessMessage, setWarningError } = useContext(ThemeContext);
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();

  async function selectPaletteHandler(palette) {
    setIsLoading(true);
    const response = await CompanyService.update(params?.companyID, {
      themePalette: palette,
    });

    if (response.status !== 200) {
      setWarningError("Сталася помилка при виконанні запиту");
    } else {
      if (successCallback) await successCallback();
      setSuccessMessage(`Вітаємо! Тема шаблону для Вашого боту змінена`);
    }

    setIsLoading(false);
  }
  return (
    <div>
      {isLoading && (
        <div className="bg-white/50 backdrop-blur-xs p-4 flex justify-center items-center absolute -top-1 -right-1 -bottom-1 -left-1 rounded-xl z-20">
          <Spinner />
        </div>
      )}
      <div className="flex flex-wrap -mx-1">
        <div className="w-1/3 p-1">
          <div
            className="border border-gray-100 bg-gray-50 p-2 rounded-xl"
            onClick={() => selectPaletteHandler("honey")}
          >
            <div>
              <div className="w-12 h-12 rounded-full m-auto bg-yellow-300 flex justify-center items-center">
                {activePalette === "honey" && (
                  <CheckCircleIcon className={"w-6 h-6 text-white"} />
                )}
              </div>
            </div>
            <div className="mt-2 font-black text-center text-gray-700">
              Honey
            </div>
          </div>
        </div>
        <div className="w-1/3 p-1">
          <div
            className="border border-gray-100 bg-gray-50 p-2 rounded-xl"
            onClick={() => selectPaletteHandler("lime")}
          >
            <div>
              <div className="w-12 h-12 rounded-full m-auto bg-green-300 flex justify-center items-center">
                {activePalette === "lime" && (
                  <CheckCircleIcon className={"w-6 h-6 text-white"} />
                )}
              </div>
            </div>
            <div className="mt-2 font-black text-center text-gray-700">
              Lime
            </div>
          </div>
        </div>
        <div className="w-1/3 p-1">
          <div
            className="border border-gray-100 bg-gray-50 p-2 rounded-xl"
            onClick={() => selectPaletteHandler("pink")}
          >
            <div>
              <div className="w-12 h-12 rounded-full m-auto bg-pink-300 flex justify-center items-center">
                {activePalette === "pink" && (
                  <CheckCircleIcon className={"w-6 h-6 text-white"} />
                )}
              </div>
            </div>
            <div className="mt-2 font-black text-center text-gray-700">
              Pink
            </div>
          </div>
        </div>
        <div className="w-1/3 p-1">
          <div
            className="border border-gray-100 bg-gray-50 p-2 rounded-xl"
            onClick={() => selectPaletteHandler("blue")}
          >
            <div>
              <div className="w-12 h-12 rounded-full m-auto bg-mainBlue flex justify-center items-center">
                {activePalette === "blue" && (
                  <CheckCircleIcon className={"w-6 h-6 text-white"} />
                )}
              </div>
            </div>
            <div className="mt-2 font-black text-center text-gray-700">
              Blue
            </div>
          </div>
        </div>
        <div className="w-1/3 p-1">
          <div
            className="border border-gray-100 bg-gray-50 p-2 rounded-xl"
            onClick={() => selectPaletteHandler("woodland")}
          >
            <div>
              <div className="w-12 h-12 rounded-full m-auto bg-amber-900 flex justify-center items-center">
                {activePalette === "woodland" && (
                  <CheckCircleIcon className={"w-6 h-6 text-white"} />
                )}
              </div>
            </div>
            <div className="mt-2 font-black text-center text-gray-700">
              Woodland
            </div>
          </div>
        </div>
        <div className="w-1/3 p-1">
          <div
            className="border border-gray-100 bg-gray-50 p-2 rounded-xl"
            onClick={() => selectPaletteHandler("dark")}
          >
            <div>
              <div className="w-12 h-12 rounded-full m-auto bg-gray-500 flex justify-center items-center">
                {activePalette === "dark" && (
                  <CheckCircleIcon className={"w-6 h-6 text-white"} />
                )}
              </div>
            </div>
            <div className="mt-2 font-black text-center text-gray-700">
              Dark
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
