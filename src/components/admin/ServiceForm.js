"use client";
import { PlusIcon } from "../ui/Icons";
import BaseModal from "../ui/BaseModal";
import { useState } from "react";
import Calendar from "../ui/calendar/Calendar";

export default function ServiceForm() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [priceWithSale, setPriceWithSale] = useState("");
  const [isSale, setIsSale] = useState(false);

  function closeModal() {
    setIsModalVisible(false);
    setLoading(false);
    setIsSale(false);
    setPriceWithSale("");
    setName("");
    setPrice("");
  }

  async function createService(params) {}

  function selectSale() {
    setIsSale((saleState) => !saleState);
    if (!isSale) {
      setPriceWithSale("");
    }
  }

  return (
    <div>
      <div>
        <button
          className="button w-full"
          onClick={() => setIsModalVisible(true)}
        >
          <PlusIcon className={"w-5 h-5 me-2"} />
          Додати
        </button>
      </div>
      {isModalVisible && (
        <BaseModal
          title={"Нова послуга"}
          triger={isModalVisible}
          cancelFn={closeModal}
          confirmFn={createService}
          loading={loading}
        >
          <div className="">
            <div className="my-4">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Назва послуги
              </label>
              <input
                type="text"
                id="name"
                className="input"
                placeholder="Введіть тут..."
                onChange={(event) => setName(event.target.value)}
                value={name}
              />
            </div>
            <div className="my-4">
              <label
                htmlFor="price"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Ціна за послугу
              </label>
              <input
                type="text"
                id="price"
                className="input"
                placeholder="Введіть тут..."
                onChange={(event) => setPrice(event.target.value)}
                value={price}
              />
            </div>
            <div>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  value={isSale}
                  onChange={() => selectSale()}
                  className="sr-only peer"
                />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-mainBlue "></div>
                <span className="block ms-2 text-sm font-medium text-gray-900 dark:text-white">
                  Додати знижку
                </span>
              </label>

              {isSale && (
                <div>
                  <div className="my-4">
                    <label
                      htmlFor="sale"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Ціна зі знижкою
                    </label>
                    <input
                      type="text"
                      id="sale"
                      className="input"
                      placeholder="Введіть тут..."
                      onChange={(event) => setPriceWithSale(event.target.value)}
                      value={priceWithSale}
                    />
                  </div>
                  <div className="my-4">
                    <label
                      htmlFor="sale"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Дата завершення акції
                    </label>
                    <div className="">
                      <Calendar />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </BaseModal>
      )}
    </div>
  );
}
