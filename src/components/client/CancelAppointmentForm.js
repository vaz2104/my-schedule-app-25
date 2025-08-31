import { Fragment, useContext, useState } from "react";
import ConfirmModal from "../ui/ConfirmModal";
import { ThemeContext } from "@/context/ThemeContext";
import { ServicesService } from "@/services/ServicesService";
import { TrashIcon } from "../ui/Icons";
import { AppointmentService } from "@/services/AppointmentService";

export default function CancelAppointmentForm({ mapItemId, successHandler }) {
  const [appointmentId, setAppointmentId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setWarningError } = useContext(ThemeContext);

  async function cancelAppointment() {
    setIsLoading(true);
    const response = await AppointmentService.delete(appointmentId);
    console.log(response);

    if (response.status !== 200) {
      setAppointmentId(null);
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
        onClick={() => setAppointmentId(mapItemId)}
      >
        <TrashIcon className="w-4 text-red-600" />
      </button>
      <ConfirmModal
        triger={appointmentId}
        cancelFn={() => setAppointmentId(null)}
        confirmFn={cancelAppointment}
        title={`Ви дійсно бажаєте скасувати даний запис?`}
        loading={isLoading}
      />
    </Fragment>
  );
}
