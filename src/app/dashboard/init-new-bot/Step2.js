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
        <ol className="relative text-gray-500 border-s border-gray-200 ml-3">
          <li className="mb-10 ms-6">
            <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white">
              1
            </span>
            <div className="pt-1.5">
              <p className="font-light text-left text-gray-500 text-sm">
                Відкрийте
                <a
                  target="_blunk"
                  href="https://t.me/botfather"
                  className="text-mainDark font-bold underline mx-1"
                >
                  @BotFather
                </a>
                та перейдіть по наступних кроках: <br />
                <span className="font-bold">Open</span> {`>`}{" "}
                <span className="font-bold">
                  {`"`}Назва Вашого бота{`"`}
                </span>{" "}
                {` > `} <span className="font-bold">Mini Apps</span>
                {` > `} <span className="font-bold">Main App</span>
              </p>
            </div>
          </li>
          <li className="mb-10 ms-6">
            <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white">
              2
            </span>
            <div className="pt-1.5">
              <p className="font-light text-left text-gray-500 text-sm">
                Вставте Ваше персональне посилання в поле{" "}
                <span className="font-bold">
                  {`"`}Enter URL{`"`}
                </span>
              </p>
            </div>
          </li>
          <li className="mb-10 ms-6">
            <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white">
              3
            </span>
            <div className="pt-0.5">
              <p className="my-1 font-light text-left text-gray-500 text-sm">
                В блоці{" "}
                <span className="text-gray-500 font-bold">
                  &quot;Launch Mode&quot;
                </span>{" "}
                оберіть варіант{" "}
                <span className="text-gray-500 font-bold">
                  &quot;Fullsize&quot;
                </span>
              </p>
            </div>
          </li>
          <li className="mb-10 ms-6">
            <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white">
              4
            </span>
            <div className="pt-1.5">
              <p className="font-light text-left text-gray-500 text-sm">
                Натисніть кнопку{" "}
                <span className="font-bold">
                  {`"`}Save{`"`}
                </span>
              </p>
            </div>
          </li>
        </ol>
      </div>
    </div>
  );
}
