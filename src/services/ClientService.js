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
}

export const ClientService = new ClientServiceClass();
