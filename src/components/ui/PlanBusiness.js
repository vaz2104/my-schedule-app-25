import { CheckCircleIcon } from "./Icons";

export default function PlanBusiness({
  activePlan,
  selectHandler,
  exchange,
  price,
  salePrice,
}) {
  const priceForExchange = salePrice || price;
  return (
    <div className="bg-gray-50 shadow-sm p-4 pb-8 rounded-xl h-full flex flex-col">
      <div className="mb-4 mt-4 text-center">
        <h2 className="font-bold text-2xl text-gray-700">Бізнес</h2>
      </div>
      <div className="flex items-end justify-center">
        <div className="flex justify-center items-baseline text-gray-900">
          <span className="text-3xl font-semibold">€</span>
          <span className="text-5xl font-extrabold tracking-tight">
            {salePrice || price}
          </span>
          <span className="ms-1 text-xl font-normal text-gray-500">/міс</span>
        </div>
        {salePrice && (
          <div className="relative ml-4 flex justify-center items-baseline text-gray-400">
            <div className="absolute top-1/2 -left-1 -right-1 border border-gray-400 rotate-15"></div>
            <span className="text-2xl font-semibold">€</span>
            <span className="text-3xl font-extrabold tracking-tight">
              {price}
            </span>
            <span className="ms-1 font-normal text-gray-500">/міс</span>
          </div>
        )}
      </div>
      <div className="mt-2 text-center text-gray-400">
        {Math.ceil(priceForExchange * exchange)} ₴ /місяць
      </div>
      <div className="mt-4 max-w-xs m-auto">
        <p className="text-gray-500 text-base text-center min-h-24">
          План чудово підходить для малих бізнесів з кількома працівниками
        </p>
      </div>

      <div className="mt-4 flex-1">
        <ul className="max-w-md space-y-1 text-gray-500 list-inside">
          <li className="flex items-center">
            <CheckCircleIcon className={"w-4 h-4 text-green-600"} />
            <p className="ml-2">3 співробітники включно</p>
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
        {activePlan === "business" ? (
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
