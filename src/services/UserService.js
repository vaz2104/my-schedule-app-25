import fetchApi from "../lib/fetchApi";

class UserServiceClass {
  async getTelegramUser(id, options) {
    let sp = new URLSearchParams(options);
    const queryString = sp.toString();

    const data = await fetchApi(
      `${process.env.NEXT_PUBLIC_BOT_BACKEND_URL}/api/telegram-user/${id}${
        queryString ? `?${queryString}` : ``
      }`,
      {},
      "GET"
    );

    return data;
  }
}

export const UserService = new UserServiceClass();
