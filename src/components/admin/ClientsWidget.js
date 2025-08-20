import CopyToClipboard from "../ui/CopyToClipboard";
import { LinkIcon } from "../ui/Icons";

export default function ClientsWidget() {
  return (
    <div className="mb-6">
      <div className="flex -mx-1">
        <div className="w-2/3 px-1">
          <div className="rounded-xl bg-gray-100 p-4 text-center">
            <div className="">
              <div className="">
                <div className="flex justify-center items-center">
                  <LinkIcon className={`h-4`} />
                  <div className="text-md font-bold ml-0.5 overflow-hidden text-ellipsis">
                    t.me/{"botInfo.username"}
                  </div>
                </div>
                <div className="text-xs mt-2">
                  <p>
                    Поширюйте це посилання та залучайте більше людей до
                    користування Вашим ботом.
                  </p>
                </div>
                <CopyToClipboard text={`https://t.me/${"AnnaNailsVnBot"}`} />
              </div>
            </div>
          </div>
        </div>

        <div className="w-1/3 px-1">
          <div className="h-full rounded-xl bg-gray-100 p-4 text-center">
            <div className="flex flex-col items-center justify-center h-full">
              <div className="text-4xl font-bold">{1232}</div>
              <div className="text-xs mt-2">Клієнти, що користуються ботом</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
