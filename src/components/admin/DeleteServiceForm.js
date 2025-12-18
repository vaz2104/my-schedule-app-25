import { Fragment, useContext, useState } from "react";
import ConfirmModal from "../ui/ConfirmModal";
import { ThemeContext } from "@/context/ThemeContext";
import { ServicesService } from "@/services/ServicesService";
import { TrashIcon } from "../ui/Icons";

export default function DeleteServiceForm({ mapItemId, successHandler }) {
  const [deleteServiceId, setDeleteServiceId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { setWarningError } = useContext(ThemeContext);

  async function deleteService() {
    setIsLoading(true);
    const servicesResponse = await ServicesService.delete(deleteServiceId);

    if (servicesResponse.status !== 200) {
      setDeleteServiceId(null);
      setWarningError("Сталася помилка при виконанні запиту");
    } else {
      if (successHandler) successHandler();
    }

    setIsLoading(false);
  }

  return (
    <Fragment>
      <button
        className="button blank !px-2"
        onClick={() => setDeleteServiceId(mapItemId)}
      >
        <TrashIcon className="w-4 text-red-600" />
      </button>
      <ConfirmModal
        triger={deleteServiceId}
        cancelFn={() => setDeleteServiceId(null)}
        confirmFn={deleteService}
        title={`Ви дійсно бажаєте видалити дану послугу?`}
        loading={isLoading}
      />
    </Fragment>
  );
}
