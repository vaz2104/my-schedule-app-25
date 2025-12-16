"use client";
import { PlusIcon } from "../ui/Icons";
import BaseModal from "../ui/BaseModal";
import { useState } from "react";
import Calendar from "../ui/calendar/Calendar";
import { ServicesService } from "@/services/ServicesService";
import { useParams } from "next/navigation";
import Alert from "../ui/Alert";
import { AuthService } from "@/services/AuthService";
import { NotificationService } from "@/services/NotificatoinsServices";

export default function NewServiceForm({ successHandler }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [priceWithSale, setPriceWithSale] = useState("");
  const [saleEndDay, setSaleEndDay] = useState("");
  const [isSale, setIsSale] = useState(false);
  const [sentNotification, setSentNotification] = useState(false);
  const [error, setError] = useState(null);
  const params = useParams();

  function closeModal() {
    setIsModalVisible(false);
    setIsLoading(false);
    setIsSale(false);
    setPriceWithSale("");
    setName("");
    setPrice("");
  }

  async function createService() {
    setIsLoading(true);

    if (!name) {
      setError("Ви не вказали назву послуги");
      setIsLoading(false);
      return;
    }

    if (priceWithSale && !saleEndDay) {
      setError(
        "Ви вказали ціну зі знижкою, але не вказали дату закінчення акції"
      );
      setIsLoading(false);
      return;
    }

    if (!priceWithSale && saleEndDay) {
      setError("Ви не вказали ціну зі знижкою");
      setIsLoading(false);
      return;
    }

    if (priceWithSale && saleEndDay && !price) {
      setError("Ціна зі знижкою вказана, проте Ви не вказали стару ціну");
      setIsLoading(false);
      return;
    }

    if (parseInt(priceWithSale) > parseInt(price)) {
      setError("Ціна зі знижкою не може перевищувати стару ціну");
      setIsLoading(false);
      return;
    }

    const query = {
      botId: params?.companyID,
      service: name,
      price,
      timestamp: Date.now(),
    };

    if (isSale) {
      query.priceWithSale = priceWithSale;
      query.saleEndDay = saleEndDay;
    }

    const newServiceResponse = await ServicesService.create(query);
    if (newServiceResponse.status !== 200) {
      setError("Сталася помилка при завантаженні даних");
      setIsLoading(false);
    } else {
      if (successHandler) successHandler();

      if (newServiceResponse?.data) {
        const session = await AuthService.getSession();
        await NotificationService.createNotification({
          notification: {
            botId: params?.companyID,
            author: session?.userId,
          },
          recipientRole: "client",
          type: "newService", //"newDiscount" :
          meta: newServiceResponse?.data,
        });
      }
      closeModal();
    }
  }

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
          error={error}
          hideErrorFn={() => setError(null)}
          loading={isLoading}
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
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-main "></div>
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
                      <Calendar
                        options={{
                          setCustomStateValue: setSaleEndDay,
                          customStateValue: saleEndDay,
                          disabledOldDays: true,
                        }}
                      />
                    </div>
                  </div>

                  <div className="my-4">
                    {sentNotification && (
                      <div className="mb-4">
                        <Alert type="warning">
                          Будьте уважні та перевірте всі зміни! Після збереження
                          клієнти отримають повідомлення із всіма деталями про
                          знижку!
                        </Alert>
                      </div>
                    )}
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        value={sentNotification}
                        onChange={() => setSentNotification(!sentNotification)}
                        className="sr-only peer"
                        checked={sentNotification}
                      />
                      <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-main "></div>
                      <span className="block ms-2 text-sm font-medium text-gray-900 dark:text-white">
                        Сповістити клієнтів про знижку
                      </span>
                    </label>
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
