import CopyToClipboard from "@/components/ui/CopyToClipboard";

export default function Step2({ botData }) {
  return (
    <div>
      <p className="my-6 font-light text-left text-gray-500 text-sm">
        Аби підєднати бот до нашої панелі, скопіюйте Ваше персональне посилання
        та виконайте інструкцію нижче
      </p>

      <p className="text-ellipsis overflow-hidden bg-slate-200 p-2 rounded text-center">
        {process.env.NEXT_PUBLIC_APP_URL}/panel/{botData?._id}
      </p>
      <div className="flex justify-center mt-1">
        <CopyToClipboard
          text={`${process.env.NEXT_PUBLIC_APP_URL}/panel/${botData?._id}`}
        />
      </div>

      <div className="mt-8">
        <ol className="relative text-gray-500 border-s border-gray-200 dark:border-gray-700 dark:text-gray-400 ml-3">
          <li className="mb-10 ms-6">
            <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
              1
            </span>
            <div className="pt-1.5">
              <p className="font-light text-left text-gray-500 text-sm">
                Відкрийте
                <a
                  target="_blunk"
                  href="https://t.me/botfather"
                  className="text-mainBlueDark font-bold underline mx-1"
                >
                  @BotFather
                </a>
                та перейдіть по наступних кроках: <br />
                <span className="font-bold">/mybots</span> {`>`}{" "}
                <span className="font-bold">
                  {`"`}Назва Вашого бота{`"`}
                </span>{" "}
                {` > `} <span className="font-bold">Bot Settings</span>
                {` > `} <span className="font-bold">Configure Mini App</span>{" "}
                {` > `}
                <span className="font-bold">Enable Mini App</span>
              </p>
            </div>
          </li>
          <li className="mb-10 ms-6">
            <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
              2
            </span>
            <div className="pt-0.5">
              <p className="my-1 font-light text-left text-gray-500 text-sm">
                Вставте в поле Ваше персональне посилання та відправте
              </p>
            </div>
          </li>
        </ol>
      </div>
    </div>
  );
}
