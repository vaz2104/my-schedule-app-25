import { CheckCircleIcon } from "./Icons";

export default function PlanBusinessPlus({ activePlan, selectHandler }) {
  return (
    <div className="bg-gray-50 shadow-sm p-4 pb-8 rounded-xl h-full flex flex-col">
      <div className="mb-4 mt-4 text-center">
        <h2 className="font-bold text-2xl text-gray-700">Бізнес Plus</h2>
      </div>
      <div className="flex justify-center items-baseline text-gray-900 dark:text-white">
        <span className="text-3xl font-semibold">€</span>
        <span className="text-5xl font-extrabold tracking-tight">69</span>
        <span className="ms-1 text-xl font-normal text-gray-500 dark:text-gray-400">
          /міс
        </span>
      </div>
      <div className="mt-2 text-center text-gray-400">3333 ₴ /місяць</div>
      <div className="mt-4 max-w-xs m-auto">
        <p className="text-gray-500 text-base text-center min-h-24">
          План без жодних обмежень включаючи працівників
        </p>
      </div>

      <div className="mt-4 flex-1">
        <ul className="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400">
          <li className="flex items-center">
            <CheckCircleIcon className={"w-4 h-4 text-green-600"} />
            <p className="ml-2">3 співробітники та більше</p>
          </li>
          <li className="flex items-center">
            <CheckCircleIcon className={"w-4 h-4 text-green-600"} />
            <p className="ml-2 flex-1">
              Жодних лімітів та обмежень по записах та клієнтах
            </p>
          </li>
        </ul>
      </div>
      <div className="mt-8">
        {activePlan === "businessPlus" ? (
          <div className="flex items-center justify-center">
            <CheckCircleIcon className={"w-8 h-8 text-main"} />
            <span className="text-gray-700 font-bold ml-2">
              Ваш поточний план
            </span>
          </div>
        ) : (
          <button
            className="button w-full mx-auto"
            onClick={selectHandler ? selectHandler : null}
          >
            Обрати план
          </button>
        )}
      </div>
    </div>
  );
}
