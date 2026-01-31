import React, { useContext, useState } from "react";
import Spinner from "../ui/Spinner";
import { cn } from "@/lib/cn";
import { CompanyService } from "@/services/CompanyService";
import { ThemeContext } from "@/context/ThemeContext";

export default function PhoneNumberForm({ settingsRelationId, phoneNumber }) {
  const [phone, setPhone] = useState(phoneNumber || "");
  const [isUpdating, setIsUpdating] = useState(false);
  const { setWarningError } = useContext(ThemeContext);

  async function updatePhoneNumber() {
    setIsUpdating(true);

    if (!settingsRelationId) {
      setError("Сталася помилка при обробці даних");
      setIsUpdating(false);
      return;
    }

    const regexp = /^(\+38)?0(39|50|63|66|67|68|73|89|9[1-9])[0-9]{7}$/;

    if (phone !== "" && !regexp.test(phone)) {
      setWarningError("Будь ласка, вкажіть коректний номер телефону!");
      setIsUpdating(false);
      return;
    }

    let query = {
      phoneNumber: phone,
    };

    const updatedResponse = await CompanyService.updateClientRelation(
      settingsRelationId,
      query,
    );

    if (updatedResponse.status !== 200) {
      setError("Сталася помилка при завантаженні даних");
    }

    setIsUpdating(false);
  }

  return (
    <div className="mt-16 p-1 relative">
      {isUpdating && (
        <div className="bg-white/5 backdrop-blur-xs p-4 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0 z-20">
          <Spinner />
        </div>
      )}
      <div className="font-bold mb-4">Ваш номер телефону</div>
      <div className="sm:flex -mx-1">
        <div className="mx-1 sm:flex-1">
          <input
            type="text"
            className="input"
            placeholder="Введіть тут"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="flex mx-1 mt-4 sm:mt-0">
          <button
            type="button"
            className={cn("button", isUpdating && "disabled")}
            onClick={updatePhoneNumber}
            disabled={isUpdating}
          >
            Зберегти
          </button>
        </div>
      </div>
    </div>
  );
}
