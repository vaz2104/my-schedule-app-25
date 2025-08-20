import ServiceForm from "@/components/admin/ServiceForm";
import { FireIcon, PencilIcon, TrashIcon } from "@/components/ui/Icons";

export default function Services() {
  return (
    <div className="p-4">
      <div className="mb-8 mt-4 text-center">
        <h2 className="font-bold text-xl">Мої послуги</h2>
      </div>
      <div className="mb-6">
        <ServiceForm />
      </div>
      <div className="border-t border-gray-200">
        <div className="flex justify-between items-center py-4 text-gray-900 border-b border-gray-200">
          <div>
            <div className="font-bold">Комбінований манікюр</div>
            <div>
              <span className="mr-1 translate-y-1 inline-block">
                <FireIcon className={"text-red-500"} />
              </span>
              <span className="text-red-500 text-sm">
                знижка діє до 23-09-2015
              </span>
            </div>
            <div className="text-gray-500">
              <span className="text-red-600">220 грн.</span>
              <span className="ml-2 line-through">320 грн.</span>
            </div>
          </div>
          <div className="flex">
            <div className="mr-4">
              <button className="button blank !px-2">
                <PencilIcon className="w-4 text-black" />
              </button>
            </div>

            <div className="">
              <button className="button blank !px-2">
                <TrashIcon className="w-4 text-red-600" />
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center py-4 text-gray-900 border-b border-gray-200">
          <div>
            <div className="font-bold">Покриття гель-лаком</div>
            <div className="text-gray-500">
              <span>620 грн.</span>
            </div>
          </div>
          <div className="flex">
            <div className="mr-4">
              <button className="button blank !px-2">
                <PencilIcon className="w-4 text-black" />
              </button>
            </div>

            <div className="">
              <button className="button blank !px-2">
                <TrashIcon className="w-4 text-red-600" />
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center py-4 text-gray-900 border-b border-gray-200">
          <div>
            <div className="font-bold">Нарощування нігтів</div>
            <div className="text-gray-500">
              <span>440 грн.</span>
            </div>
          </div>
          <div className="flex">
            <div className="mr-4">
              <button className="button blank !px-2">
                <PencilIcon className="w-4 text-black" />
              </button>
            </div>

            <div className="">
              <button className="button blank !px-2">
                <TrashIcon className="w-4 text-red-600" />
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center py-4 text-gray-900 border-b border-gray-200">
          <div>
            <div className="font-bold">Покриття гель-лаком</div>
            <div className="text-gray-500">
              <span>240 грн.</span>
            </div>
          </div>
          <div className="flex">
            <div className="mr-4">
              <button className="button blank !px-2">
                <PencilIcon className="w-4 text-black" />
              </button>
            </div>

            <div className="">
              <button className="button blank !px-2">
                <TrashIcon className="w-4 text-red-600" />
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center py-4 text-gray-900 border-b border-gray-200">
          <div>
            <div className="font-bold">Апаратний манікюр</div>
            <div className="text-gray-500">
              <span>340 грн.</span>
            </div>
          </div>
          <div className="flex">
            <div className="mr-4">
              <button className="button blank !px-2">
                <PencilIcon className="w-4 text-black" />
              </button>
            </div>

            <div className="">
              <button className="button blank !px-2">
                <TrashIcon className="w-4 text-red-600" />
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center py-4 text-gray-900 border-b border-gray-200">
          <div>
            <div className="font-bold">Дизайн нігтів</div>
            <div className="text-gray-500">
              <span>740 грн.</span>
            </div>
          </div>
          <div className="flex">
            <div className="mr-4">
              <button className="button blank !px-2">
                <PencilIcon className="w-4 text-black" />
              </button>
            </div>

            <div className="">
              <button className="button blank !px-2">
                <TrashIcon className="w-4 text-red-600" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
