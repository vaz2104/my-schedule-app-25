"use client";
import { AddUserIcon, EnvelopeIcon, LinkIcon, PlusIcon } from "../ui/Icons";
import BaseModal from "../ui/BaseModal";
import { useState } from "react";
import CopyToClipboard from "../ui/CopyToClipboard";

export default function InviteWorker() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [priceWithSale, setPriceWithSale] = useState("");
  const [isSale, setIsSale] = useState(false);

  function closeModal() {
    setIsModalVisible(false);
    setLoading(false);
    setIsSale(false);
    setPriceWithSale("");
    setName("");
    setPrice("");
  }

  async function createService(params) {}

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
          <AddUserIcon className={"w-6 h-6 me-1"} />
          Запросити працівника
        </button>
      </div>
      {isModalVisible && (
        <BaseModal
          title={"Запросити працівника"}
          triger={isModalVisible}
          closeFn={closeModal}
          loading={loading}
        >
          <div>
            <div className="py-8">
              <div className="flex justify-center items-center">
                <LinkIcon className={`h-4`} />
                <div className="text-md font-bold ml-0.5 overflow-hidden text-ellipsis">
                  t.me/{"botInfo.username"}
                </div>
              </div>
              <div className="text-sm mt-2">
                <p>
                  Скопіюйте та відправте дане посилання людині, яку хочете
                  додати, як працівника.
                </p>
                <p className="mt-2">
                  <span className="uppercase">Важливо!</span> Посилання
                  одноразове!
                </p>
              </div>
              <CopyToClipboard text={`https://t.me/${"AnnaNailsVnBot"}`} />
            </div>
          </div>
        </BaseModal>
      )}
    </div>
  );
}
