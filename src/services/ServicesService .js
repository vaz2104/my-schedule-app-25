import fetchApi from "../lib/fetchApi";

class ServicesServiceClass {
  async create(options) {
    const API_URL = `${process.env.NEXT_PUBLIC_BOT_BACKEND_URL}/api/service`;
    const data = await fetchApi(API_URL, options);

    return data;
  }
  async getMany(query) {
    let sp = new URLSearchParams(query);
    const queryString = sp.toString();

    const API_URL = `${process.env.NEXT_PUBLIC_BOT_BACKEND_URL}/api/service${
      queryString ? `?${queryString}` : ``
    }`;
    const data = await fetchApi(API_URL, {}, "GET");

    return data;
  }
  async getSingle(id) {
    if (!id) return null;

    const API_URL = `${process.env.NEXT_PUBLIC_BOT_BACKEND_URL}/api/service/${id}`;
    const data = await fetchApi(API_URL, {}, "GET");

    return data;
  }
  async delete(id) {
    if (!id) return null;

    const API_URL = `${process.env.NEXT_PUBLIC_BOT_BACKEND_URL}/api/service/${id}`;
    const data = await fetchApi(API_URL, {}, "DELETE");

    return data;
  }
  async update(id, options) {
    if (!id) return null;

    const API_URL = `${process.env.NEXT_PUBLIC_BOT_BACKEND_URL}/api/service/${id}`;
    const data = await fetchApi(API_URL, options, "PUT");

    return data;
  }
}

export const ServicesService = new ServicesServiceClass();
