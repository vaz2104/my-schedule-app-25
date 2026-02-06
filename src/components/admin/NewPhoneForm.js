"use client";
import BaseModal from "../ui/BaseModal";
import { useContext, useState } from "react";
import { useParams } from "next/navigation";
import { CompanyService } from "@/services/CompanyService";
import { ThemeContext } from "@/context/ThemeContext";

export default function NewPhoneForm({ phoneNumbersState, successHandler }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState(null);
  const { setWarningError } = useContext(ThemeContext);
  const params = useParams();

  function closeModal() {
    setIsModalVisible(false);
    setIsLoading(false);
    setPhoneNumber("");
  }

  async function savePhoneNumber() {
    setIsLoading(true);

    const regexp = /^(\+38)?0(39|50|63|66|67|68|73|89|9[1-9])[0-9]{7}$/;

    if (!regexp.test(phoneNumber)) {
      setWarningError("Будь ласка, вкажіть коректний номер телефону!");
      setIsLoading(false);
      return;
    }

    const newPhoneNumbersState = [...phoneNumbersState, phoneNumber];
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
    closeModal();
  }

  return (
    <div>
      <div className="flex sm:justify-center">
        <button className="button dark" onClick={() => setIsModalVisible(true)}>
          Додати номер
        </button>
      </div>
      <BaseModal
        title={"Новий номер телефону"}
        triger={isModalVisible}
        cancelFn={closeModal}
        confirmFn={savePhoneNumber}
        error={error}
        hideErrorFn={() => setError(null)}
        loading={isLoading}
      >
        <div className="mt-4 mb-8">
          <input
            type="text"
            className="input"
            placeholder="Введіть тут"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
      </BaseModal>
    </div>
  );
}
