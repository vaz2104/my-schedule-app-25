import { CheckCircleIcon } from "@/app/components/ui/Icons";

export default function ThemePalette() {
  return (
    <div>
      <div className="flex flex-wrap -mx-1">
        <div className="w-1/3 p-1">
          <div className="border border-gray-100 bg-gray-50 p-2 rounded-xl">
            <div>
              <div className="w-12 h-12 rounded-full m-auto bg-yellow-300"></div>
            </div>
            <div className="mt-2 font-black text-center text-gray-700">
              Honey
            </div>
          </div>
        </div>
        <div className="w-1/3 p-1">
          <div className="border border-gray-100 bg-gray-50 p-2 rounded-xl">
            <div>
              <div className="w-12 h-12 rounded-full m-auto bg-green-300 flex justify-center items-center">
                <CheckCircleIcon className={"w-6 h-6 text-white"} />
              </div>
            </div>
            <div className="mt-2 font-black text-center text-gray-700">
              Lime
            </div>
          </div>
        </div>
        <div className="w-1/3 p-1">
          <div className="border border-gray-100 bg-gray-50 p-2 rounded-xl">
            <div>
              <div className="w-12 h-12 rounded-full m-auto bg-pink-300"></div>
            </div>
            <div className="mt-2 font-black text-center text-gray-700">
              Pink
            </div>
          </div>
        </div>
        <div className="w-1/3 p-1">
          <div className="border border-gray-100 bg-gray-50 p-2 rounded-xl">
            <div>
              <div className="w-12 h-12 rounded-full m-auto bg-mainBlue"></div>
            </div>
            <div className="mt-2 font-black text-center text-gray-700">
              Blue
            </div>
          </div>
        </div>
        <div className="w-1/3 p-1">
          <div className="border border-gray-100 bg-gray-50 p-2 rounded-xl">
            <div>
              <div className="w-12 h-12 rounded-full m-auto bg-amber-900"></div>
            </div>
            <div className="mt-2 font-black text-center text-gray-700">
              Woodland
            </div>
          </div>
        </div>
        <div className="w-1/3 p-1">
          <div className="border border-gray-100 bg-gray-50 p-2 rounded-xl">
            <div>
              <div className="w-12 h-12 rounded-full m-auto bg-gray-500"></div>
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
