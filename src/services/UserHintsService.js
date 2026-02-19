import fetchApi from "../lib/fetchApi";

class UserHintsServiceClass {
  async create(options) {
    const API_URL = `${process.env.NEXT_PUBLIC_BOT_BACKEND_URL}/api/client-hints`;
    const data = await fetchApi(API_URL, options);

    return data;
  }
  async getMany(query) {
    let sp = new URLSearchParams(query);
    const queryString = sp.toString();

    const API_URL = `${process.env.NEXT_PUBLIC_BOT_BACKEND_URL}/api/client-hints${
      queryString ? `?${queryString}` : ``
    }`;
    const data = await fetchApi(API_URL, {}, "GET");

    return data;
  }
  async getSingle(id) {
    if (!id) return null;

    const API_URL = `${process.env.NEXT_PUBLIC_BOT_BACKEND_URL}/api/client-hints/${id}`;
    const data = await fetchApi(API_URL, {}, "GET");

    return data;
  }
  async delete(id) {
    if (!id) return null;

    const API_URL = `${process.env.NEXT_PUBLIC_BOT_BACKEND_URL}/api/client-hints/${id}`;
    const data = await fetchApi(API_URL, {}, "DELETE");

    return data;
  }
  async update(id, options) {
    if (!id) return null;

    const API_URL = `${process.env.NEXT_PUBLIC_BOT_BACKEND_URL}/api/client-hints/${id}`;
    const data = await fetchApi(API_URL, options, "PUT");

    return data;
  }
}

export const UserHintsService = new UserHintsServiceClass();
