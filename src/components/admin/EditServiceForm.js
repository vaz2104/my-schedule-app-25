"use client";
import { PencilIcon } from "../ui/Icons";
import BaseModal from "../ui/BaseModal";
import { useState } from "react";
import Calendar from "../ui/calendar/Calendar";
import { ServicesService } from "@/services/ServicesService";
import { useParams } from "next/navigation";
import Alert from "../ui/Alert";
import { AuthService } from "@/services/AuthService";
import { NotificationService } from "@/services/NotificatoinsServices";

export default function EditServiceForm({ mapItem, successHandler }) {
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

  function initFormState() {
    setIsModalVisible(true);
    setIsSale(mapItem?.saleEndDay || mapItem?.priceWithSale ? true : false);
    setPriceWithSale(mapItem?.priceWithSale);
    setSaleEndDay(mapItem?.saleEndDay);
    setName(mapItem?.service);
    setPrice(mapItem?.price);
  }

  function closeModal() {
    setIsModalVisible(false);
    setIsLoading(false);
    setIsSale(false);
    setPriceWithSale("");
    setSaleEndDay("");
    setName("");
    setPrice("");
  }

  async function updateService() {
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
      priceWithSale: priceWithSale,
      saleEndDay: saleEndDay,
    };

    const updatedServiceResponse = await ServicesService.update(
      mapItem?.id,
      query
    );

    if (updatedServiceResponse.status !== 200) {
      setError("Сталася помилка при оновленні даних");
      setIsLoading(false);
    } else {
      if (successHandler) successHandler();
      if (sentNotification) {
        const session = await AuthService.getSession();
        await NotificationService.createNotification({
          notification: {
            botId: params?.companyID,
            author: session?.userId,
          },
          recipientRole: "client",
          type: "newDiscount",
          meta: updatedServiceResponse?.data,
        });
      }
      closeModal();
    }
  }

  function selectSale(state) {
    const newState = !state;
    setIsSale(newState);

    if (!newState) {
      setPriceWithSale("");
      setSaleEndDay("");
      setSentNotification(false);
    }
  }

  return (
    <div>
      <div>
        <button className="button blank !px-2" onClick={() => initFormState()}>
          <PencilIcon className="w-4 text-black" />
        </button>
      </div>
      {isModalVisible && (
        <BaseModal
          title={"Редагування послуги"}
          triger={isModalVisible}
          cancelFn={closeModal}
          confirmFn={updateService}
          error={error}
          hideErrorFn={() => setError(null)}
          loading={isLoading}
        >
          <div className="">
            <div className="my-4">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 "
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
                className="block mb-2 text-sm font-medium text-gray-900 "
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
                  onChange={() => selectSale(isSale)}
                  className="sr-only peer"
                  checked={isSale}
                />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-main "></div>
                <span className="block ms-2 text-sm font-medium text-gray-900 ">
                  Додати знижку
                </span>
              </label>

              {isSale && (
                <div>
                  <div className="my-4">
                    <label
                      htmlFor="sale"
                      className="block mb-2 text-sm font-medium text-gray-900 "
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
                      className="block mb-2 text-sm font-medium text-gray-900 "
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
                      <span className="block ms-2 text-sm font-medium text-gray-900 ">
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
