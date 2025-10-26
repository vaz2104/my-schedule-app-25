"use client";
import { AddUserIcon, LinkIcon } from "../ui/Icons";
import BaseModal from "../ui/BaseModal";
import CopyToClipboard from "../ui/CopyToClipboard";
import { AuthService } from "@/services/AuthService";
import { useParams } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/cn";

export default function InviteWorker({ isButtonDisabled = false }) {
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
          className={cn(
            "button w-full md:!max-w-56",
            isButtonDisabled && "gray"
          )}
          onClick={() => openModalHandler()}
          disabled={isButtonDisabled}
        >
          <AddUserIcon
            className={cn("w-6 h-6 me-1", isButtonDisabled && "text-gray-400")}
          />
          <span className={cn(isButtonDisabled && "text-gray-400")}>
            Запросити працівника
          </span>
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
                    {`https://t.me/${process.env.NEXT_PUBLIC_BOT_USERNAME}?start=inviteWorker_${key}`}
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
                  <CopyToClipboard
                    text={`https://t.me/${process.env.NEXT_PUBLIC_BOT_USERNAME}?start=inviteWorker_${key}`}
                  />
                </div>
              </div>
            )}
          </div>
        </BaseModal>
      )}
    </div>
  );
}
