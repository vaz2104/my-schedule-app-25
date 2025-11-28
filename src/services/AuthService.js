import { redirect } from "next/navigation";
import fetchApi from "../lib/fetchApi";

class AuthServiceClass {
  async getSession() {
    const sessionResponse = await fetch("/api/session", {
      method: "GET",
    });

    if (sessionResponse.status !== 200) return null;

    const session = await sessionResponse.json();

    // console.log(session);

    return session;
  }

  async updateSessionUserId(userId) {
    const sessionResponse = await fetch("/api/session", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
      }),
    });

    if (sessionResponse.status !== 200) return null;

    const session = await sessionResponse.json();

    return session;
  }

  async updateSessionRole(role) {
    const sessionResponse = await fetch("/api/session", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        role,
      }),
    });

    if (sessionResponse.status !== 200) return null;

    const session = await sessionResponse.json();

    // console.log(session);

    return session;
  }

  async destroySession() {
    const session = await fetch("/api/session", {
      method: "DELETE",
    });

    if (session) redirect("/login");
  }

  async login(username, pass) {
    const authData = await fetchApi(
      `${process.env.NEXT_PUBLIC_BOT_BACKEND_URL}/api/auth/login`,
      {
        username,
        key: pass,
      }
    );

    return authData;
  }

  async getInviteLink(options) {
    const authData = await fetchApi(
      `${process.env.NEXT_PUBLIC_BOT_BACKEND_URL}/api/auth/invite-link`,
      options
    );

    return authData;
  }
}

export const AuthService = new AuthServiceClass();
