import fetchApi from "../lib/fetchApi";

class ClientServiceClass {
  async getClientRelation(options) {
    let sp = new URLSearchParams(options);
    const queryString = sp.toString();

    const data = await fetchApi(
      `${process.env.NEXT_PUBLIC_BOT_BACKEND_URL}/api/company/client-relation/${
        queryString ? `?${queryString}` : ``
      }`,
      {},
      "GET"
    );

    return data;
  }

  async getSingle(id) {
    if (!id) return null;

    const API_URL = `${process.env.NEXT_PUBLIC_BOT_BACKEND_URL}/api/telegram-user/${id}`;
    const data = await fetchApi(API_URL, {}, "GET");

    return data;
  }
}

export const ClientService = new ClientServiceClass();
