import { AuthService } from "@/services/AuthService";
import { UserService } from "@/services/UserService";

export async function updateUserSessionID() {
  if (typeof window !== "undefined") {
    const telegramUserID = window.Telegram?.WebApp?.initDataUnsafe?.user?.id; // 6683083958; //
    if (!telegramUserID) return false;

    // console.log("telegramUserID", telegramUserID);

    const session = await AuthService.getSession();

    // console.log("session", session);

    if (!session) return false;

    const platformUserResponse = await UserService.getTelegramUsers({
      userId: telegramUserID,
    });

    // console.log("platformUserResponse", platformUserResponse);

    if (
      platformUserResponse.status !== 200 ||
      platformUserResponse?.data?.length === 0
    ) {
      // setCriticallError("При завантаженні даних сталася помилка!");
      // console.log("session updating error");
      return;
    }

    const platformUser = platformUserResponse?.data[0];
    // console.log("platformUser", platformUser);

    const updatedSession = await AuthService.updateSessionUserId(
      platformUser?._id,
    );
    // console.log("session updated", updatedSession);
  }

  // return { baseDashboardLink, basePlatformLink, activePanel };
}
