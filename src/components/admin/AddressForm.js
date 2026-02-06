import React, { useEffect, useState } from "react";
import Spinner from "../ui/Spinner";
import { cn } from "@/lib/cn";
import { CompanyService } from "@/services/CompanyService";
import { useParams } from "next/navigation";

export default function AddressForm({ dbAddress }) {
  const [address, setAddress] = useState(dbAddress);
  const [isUpdating, setIsUpdating] = useState(false);
  const params = useParams();

  async function updateHandler() {
    setIsUpdating(true);

    let query = {
      address: address,
    };

    const updatedResponse = await CompanyService.update(
      params?.companyID,
      query,
    );

    if (updatedResponse.status !== 200) {
      setError("Сталася помилка при обробці даних");
    }

    setIsUpdating(false);
  }

  useEffect(() => {
    setAddress(dbAddress);
  }, [dbAddress]);

  return (
    <div className="mt-16 p-1 relative">
      {isUpdating && (
        <div className="bg-white/5 backdrop-blur-xs p-4 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0 z-20">
          <Spinner />
        </div>
      )}
      <div className="mb-4">
        <h2 className="font-bold text-lg">Ваша адреса</h2>
        <h3 className="text-sm text-gray-500">
          Додайте адресу, щоб Ваші клієнти могли легко Вас знайшли
        </h3>
      </div>
      <div className="">
        <div className="">
          <textarea
            className="input"
            placeholder="Введіть тут"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className="flex mt-4 sm:justify-center">
          <button
            type="button"
            className={cn("button", isUpdating && "disabled")}
            onClick={updateHandler}
            disabled={isUpdating}
          >
            Зберегти
          </button>
        </div>
      </div>
    </div>
  );
}
