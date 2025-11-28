import { AuthService } from "@/services/AuthService";
import { UserService } from "@/services/UserService";

export async function updateUserSessionID() {
  if (typeof window !== "undefined") {
    const telegramUserID = window.Telegram?.WebApp?.initDataUnsafe?.user?.id; // 6683083958; //
    if (!telegramUserID) return false;

    const session = await AuthService.getSession();

    if (!session) return false;

    const platformUserResponse = await UserService.getTelegramUser({
      userId: telegramUserID,
    });

    if (
      platformUserResponse.status !== 200 ||
      platformUserResponse?.data?.length === 0
    ) {
      // setCriticallError("При завантаженні даних сталася помилка!");
      console.log("session updating error");
      return;
    }

    const platformUser = platformUserResponse?.data[0];

    await AuthService.updateSessionUserId(platformUser?._id);
    console.log("session updated");
  }

  // return { baseDashboardLink, basePlatformLink, activePanel };
}
