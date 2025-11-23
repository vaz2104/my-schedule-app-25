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

  async update(id, options) {
    if (!id) return null;

    const API_URL = `${process.env.NEXT_PUBLIC_BOT_BACKEND_URL}/api/company/${id}`;
    const data = await fetchApi(API_URL, options, "PUT");

    return data;
  }

  async updateClientRelation(id, options) {
    if (!id) return null;

    const API_URL = `${process.env.NEXT_PUBLIC_BOT_BACKEND_URL}/api/company-relation/client/${id}`;
    const data = await fetchApi(API_URL, options, "PUT");

    return data;
  }

  async updateWorkerRelation(id, options) {
    if (!id) return null;

    const API_URL = `${process.env.NEXT_PUBLIC_BOT_BACKEND_URL}/api/company-relation/worker/${id}`;
    const data = await fetchApi(API_URL, options, "PUT");

    return data;
  }
}

export const CompanyService = new CompanyServiceClass();
