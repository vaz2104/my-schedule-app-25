"use client";
import { AddUserIcon, LinkIcon } from "../ui/Icons";
import BaseModal from "../ui/BaseModal";
import CopyToClipboard from "../ui/CopyToClipboard";
import { AuthService } from "@/services/AuthService";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function InviteWorker() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [key, setKey] = useState("");
  const [error, setError] = useState(null);
  const params = useParams();

  function closeModal() {
    setIsModalVisible(false);
    setIsLoading(false);
    setError(null);
    setKey("");
  }

  async function generateInviteLink() {
    setIsLoading(true);
    const newKeyResponse = await AuthService.getInviteLink({
      botId: params?.companyID,
      timestamp: Date.now(),
    });

    if (newKeyResponse.status !== 200) {
      setError("Сталася помилка при завантаженні даних");
    } else {
      setKey(newKeyResponse.data);
    }

    setIsLoading(false);
  }

  async function openModalHandler() {
    await generateInviteLink();
    setIsModalVisible(true);
  }

  return (
    <div>
      <div>
        <button
          className="button w-full md:!max-w-56"
          onClick={() => openModalHandler()}
        >
          <AddUserIcon className={"w-6 h-6 me-1"} />
          Запросити працівника
        </button>
      </div>
      {isModalVisible && (
        <BaseModal
          title={"Запросити працівника"}
          triger={isModalVisible}
          closeFn={closeModal}
          loading={isLoading}
          error={error}
          hideErrorFn={() => setError(null)}
        >
          <div>
            {!key ? (
              <div className="my-4">
                <button
                  className="button dark w-full"
                  onClick={openModalHandler}
                >
                  Згенерувати посилання
                </button>
              </div>
            ) : (
              <div className="py-4">
                <div className="flex justify-center items-center">
                  <LinkIcon className={`h-4`} />
                  <div className="text-md font-bold ml-0.5 overflow-hidden text-ellipsis">
                    t.me/{key}
                  </div>
                </div>
                <div className="text-sm mt-2 text-center">
                  <p>
                    Скопіюйте та відправте дане посилання людині, яку хочете
                    додати, як працівника.
                  </p>
                  <p className="mt-2">
                    <span className="uppercase">Важливо!</span> Посилання
                    одноразове!
                  </p>
                </div>
                <div className="flex justify-center">
                  <CopyToClipboard text={`https://t.me/${key}`} />
                </div>
              </div>
            )}
          </div>
        </BaseModal>
      )}
    </div>
  );
}
