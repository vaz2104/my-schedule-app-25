import React, { useContext, useState } from "react";
import Spinner from "../ui/Spinner";
import { cn } from "@/lib/cn";
import { CompanyService } from "@/services/CompanyService";
import { ThemeContext } from "@/context/ThemeContext";

export default function UserInitialsForm({
  settingsRelationId,
  dbFirstName,
  dbLastName,
}) {
  const [firstName, setFirstName] = useState(dbFirstName || "");
  const [lastName, setLastName] = useState(dbLastName || "");
  const [isUpdating, setIsUpdating] = useState(false);
  const { setWarningError } = useContext(ThemeContext);

  async function updatePhoneNumber() {
    setIsUpdating(true);

    if (!settingsRelationId) {
      setError("Сталася помилка при обробці даних");
      setIsUpdating(false);
      return;
    }

    let query = {
      firstName,
      lastName,
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
      <div className="font-bold mb-4">Ваше прізвище та ім`я</div>

      <div className="mt-4">
        <div className="mt-4">
          <div className="">
            <input
              type="text"
              className="input"
              placeholder="Ім`я"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-4">
          <input
            type="text"
            className="input"
            placeholder="Прізвище"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
      </div>

      <div className="flex mt-4 ">
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
  );
}
