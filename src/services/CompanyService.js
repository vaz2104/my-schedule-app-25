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
  async getBots(options) {
    let sp = new URLSearchParams(options);
    const queryString = sp.toString();

    const bots = await fetchApi(
      `${process.env.NEXT_PUBLIC_BOT_BACKEND_URL}/api/company${
        queryString ? `?${queryString}` : ``
      }`,
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

  async getWorkers(options) {
    let sp = new URLSearchParams(options);
    const queryString = sp.toString();

    const bots = await fetchApi(
      `${process.env.NEXT_PUBLIC_BOT_BACKEND_URL}/api/company-relation/worker/${
        queryString ? `?${queryString}` : ``
      }`,
      {},
      "GET"
    );
    return bots;
  }

  async getClients(options) {
    let sp = new URLSearchParams(options);
    const queryString = sp.toString();

    const data = await fetchApi(
      `${process.env.NEXT_PUBLIC_BOT_BACKEND_URL}/api/company-relation/client/${
        queryString ? `?${queryString}` : ``
      }`,
      {},
      "GET"
    );

    return data;
  }
}

export const CompanyService = new CompanyServiceClass();
