import { Fragment, useContext, useState } from "react";
import ConfirmModal from "../ui/ConfirmModal";
import { ThemeContext } from "@/context/ThemeContext";
import { CloseIcon, TrashIcon } from "../ui/Icons";
import { AppointmentService } from "@/services/AppointmentService";
import { NotificationService } from "@/services/NotificatoinsServices";
import { AuthService } from "@/services/AuthService";
import { useParams } from "next/navigation";

export default function CancelAppointmentForm({ mapItemId, successHandler }) {
  const [appointmentId, setAppointmentId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setWarningError } = useContext(ThemeContext);
  const params = useParams();

  async function cancelAppointment() {
    setIsLoading(true);
    const appointmentResponse = await AppointmentService.getSingle(
      appointmentId
    );
    const response = await AppointmentService.delete(appointmentId);

    if (response.status !== 200) {
      setAppointmentId(null);
      setWarningError("Сталася помилка при виконанні запиту");
    } else {
      const session = await AuthService.getSession();
      await NotificationService.createNotification({
        notification: {
          botId: params?.companyID,
          author: session?.userId,
        },
        recipientRole: "admin",
        type: "clientCancelAppointment",
        meta: appointmentResponse?.data,
      });

      if (successHandler) successHandler();
    }

    setIsLoading(false);
  }

  return (
    <Fragment>
      <button
        className="button red medium !text-white "
        onClick={() => setAppointmentId(mapItemId)}
      >
        <span className="mr-1">Скасувати</span>
        <TrashIcon className="w-4 text-white" />
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
