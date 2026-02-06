import React, { useContext, useEffect, useState } from "react";
import Spinner from "../ui/Spinner";
import { cn } from "@/lib/cn";
import { CompanyService } from "@/services/CompanyService";
import { ThemeContext } from "@/context/ThemeContext";
import { PencilIcon, TrashIcon } from "../ui/Icons";
import ConfirmModal from "../ui/ConfirmModal";
import { useParams } from "next/navigation";
import BaseModal from "../ui/BaseModal";

export default function PhoneNumberForm({ dbPhoneNumbers, successHandler }) {
  const [phoneNumbers, setPhoneNumbers] = useState(dbPhoneNumbers);
  const [phoneIndexToDelete, setPhoneIndexToDelete] = useState(null);
  const [phoneIndexToEdit, setPhoneIndexToEdit] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const { setWarningError } = useContext(ThemeContext);
  const [error, setError] = useState(null);
  const [editedPhoneNumber, setEditedPhoneNumber] = useState("");
  const params = useParams();

  async function confirmDeletePhoneNumberHandler() {
    setIsUpdating(true);

    const newPhoneNumbersState = phoneNumbers.filter(
      (phone, index) => index !== phoneIndexToDelete,
    );

    let query = {
      phoneNumbers: newPhoneNumbersState,
    };

    const updatedResponse = await CompanyService.update(
      params?.companyID,
      query,
    );

    if (updatedResponse.status !== 200) {
      setError("Сталася помилка при обробці даних");
      return;
    }
    setPhoneIndexToDelete(null);
    successHandler();
    setIsUpdating(false);
  }

  async function updatePhoneNumber() {
    setIsUpdating(true);

    const regexp = /^(\+38)?0(39|50|63|66|67|68|73|89|9[1-9])[0-9]{7}$/;

    if (!regexp.test(editedPhoneNumber)) {
      setWarningError("Будь ласка, вкажіть коректний номер телефону!");
      setIsUpdating(false);
      return;
    }

    const newPhoneNumbersState = [];
    phoneNumbers.forEach((number, index) => {
      if (index !== phoneIndexToEdit) {
        newPhoneNumbersState.push(number);
      } else newPhoneNumbersState.push(editedPhoneNumber);
    });

    let query = {
      phoneNumbers: newPhoneNumbersState,
    };

    const updatedResponse = await CompanyService.update(
      params?.companyID,
      query,
    );

    if (updatedResponse.status !== 200) {
      setError("Сталася помилка при обробці даних");
      return;
    }
    successHandler();
    setPhoneIndexToEdit(null);
  }

  useEffect(() => {
    setPhoneNumbers(dbPhoneNumbers);
  }, [dbPhoneNumbers]);

  return (
    <div className="mt-16 p-1 relative">
      {isUpdating && (
        <div className="bg-white/5 backdrop-blur-xs p-4 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0 z-20">
          <Spinner />
        </div>
      )}

      <div className="mb-4">
        <h2 className="font-bold text-lg">Ваш номер телефону</h2>
      </div>

      {phoneNumbers?.length > 0 ? (
        <>
          {phoneNumbers.map((phone, key) => {
            return (
              <div
                className="flex items-center -mx-1 mt-4"
                key={`phone-${key}`}
              >
                <div className="mx-1 flex-1 text-lg">{phone}</div>
                <div className="flex mx-1">
                  <button
                    type="button"
                    className={cn("button gray", isUpdating && "disabled")}
                    onClick={() => {
                      setPhoneIndexToEdit(key);
                      setEditedPhoneNumber(phone);
                    }}
                    disabled={isUpdating}
                  >
                    <PencilIcon />
                  </button>
                </div>
                <div className="flex mx-1">
                  <button
                    type="button"
                    className={cn("button red", isUpdating && "disabled")}
                    onClick={() => setPhoneIndexToDelete(key)}
                    disabled={isUpdating}
                  >
                    <TrashIcon />
                  </button>
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <div className="py-4">
          <p className="text-gray-500 text-base text-center">
            Додайте номери телефонів, щоб клієнти могли зв&apos;язатися з Вами
          </p>
        </div>
      )}

      <ConfirmModal
        triger={phoneIndexToDelete !== null}
        cancelFn={() => setPhoneIndexToDelete(null)}
        confirmFn={confirmDeletePhoneNumberHandler}
        title={`Ви дійсно бажаєте видалити даний номер телефону?`}
        loading={isUpdating}
      />

      <BaseModal
        title={"Змінити номер телефону"}
        triger={phoneIndexToEdit !== null}
        cancelFn={() => {
          setPhoneIndexToEdit(null);
          setIsUpdating(false);
          setEditedPhoneNumber("");
        }}
        confirmFn={updatePhoneNumber}
        error={error}
        hideErrorFn={() => setError(null)}
        loading={isUpdating}
      >
        <div className="mt-4 mb-8">
          <input
            type="text"
            className="input"
            placeholder="Введіть тут"
            value={editedPhoneNumber}
            onChange={(e) => setEditedPhoneNumber(e.target.value)}
          />
        </div>
      </BaseModal>
    </div>
  );
}
