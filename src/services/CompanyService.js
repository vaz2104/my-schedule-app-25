import fetchApi from "../lib/fetchApi";

class CompanyServiceClass {
  async getBotInfo(token) {
    const botData = await fetchApi(
      `${process.env.NEXT_PUBLIC_BOT_BACKEND_URL}/api/bot/${token}`,
      {},
      "GET"
    );
    return botData;
  }

  async saveNewBot(adminId, token) {
    const botData = await fetchApi(
      `${process.env.NEXT_PUBLIC_BOT_BACKEND_URL}/api/company`,
      {
        adminId,
        token,
      }
    );
    return botData;
  }
  async getBots(adminId) {
    const bots = await fetchApi(
      `${process.env.NEXT_PUBLIC_BOT_BACKEND_URL}/api/company/?adminId=${adminId}`,
      {},
      "GET"
    );
    return bots;
  }
  async getBot(botId) {
    const bots = await fetchApi(
      `${process.env.NEXT_PUBLIC_BOT_BACKEND_URL}/api/company/${botId}`,
      {},
      "GET"
    );
    return bots;
  }

  async getWorkers(adminId) {
    const bots = await fetchApi(
      `${process.env.NEXT_PUBLIC_BOT_BACKEND_URL}/api/bot/teacher/${adminId}`,
      {},
      "GET"
    );
    return bots;
  }
}

export const CompanyService = new CompanyServiceClass();
