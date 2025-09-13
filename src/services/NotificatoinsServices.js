import fetchApi from "@/lib/fetchApi";

class NotificationServiceClass {
  async createNotification(options) {
    const API_URL = `${process.env.NEXT_PUBLIC_BOT_BACKEND_URL}/api/notification`;
    const data = await fetchApi(API_URL, options);

    return data;
  }
  async getMany(query) {
    let sp = new URLSearchParams(query);
    const queryString = sp.toString();

    const API_URL = `${
      process.env.NEXT_PUBLIC_BOT_BACKEND_URL
    }/api/notification${queryString ? `?${queryString}` : ``}`;
    const data = await fetchApi(API_URL, {}, "GET");

    return data;
  }
}

export const NotificationService = new NotificationServiceClass();
