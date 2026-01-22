import fetchApi from "../lib/fetchApi";

class ClientServiceClass {
  async getSingle(id) {
    if (!id) return null;

    const API_URL = `${process.env.NEXT_PUBLIC_BOT_BACKEND_URL}/api/telegram-user/${id}`;
    const data = await fetchApi(API_URL, {}, "GET");

    return data;
  }
}

export const ClientService = new ClientServiceClass();
