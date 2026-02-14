import React, { useState } from "react";
import BaseModal from "../ui/BaseModal";
import { PhoneSolidIcon } from "../ui/Icons";

export default function PhoneNumbersModal({ phoneNumbers }) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  if (!phoneNumbers || !phoneNumbers?.length) return <></>;

  return (
    <>
      <button className="button medium" onClick={() => setIsModalVisible(true)}>
        <PhoneSolidIcon className={"w-5 h-5"} />

        <span className="ml-0.5">Наші контакти</span>
      </button>

      {isModalVisible && (
        <BaseModal
          title={"Наші номери телефонів"}
          triger={isModalVisible}
          closeFn={() => setIsModalVisible(false)}
        >
          <div className="">
            {phoneNumbers.map((number, index) => {
              return (
                <div className="mt-2" key={`pn-${index}`}>
                  <a
                    href={`tel:${number}`}
                    className="flex items-center text-main"
                  >
                    <PhoneSolidIcon className={"w-5 h-5 text-gray-500"} />
                    <span className="ml-0.5 text-lg text-gray-500">
                      {number}
                    </span>
                  </a>
                </div>
              );
            })}
          </div>
        </BaseModal>
      )}
    </>
  );
}
