"use client";

import { useContext, useState } from "react";
import Spinner from "@/components/ui/Spinner";
import { AuthService } from "@/services/AuthService";
import { ThemeContext } from "@/context/ThemeContext";
import { redirect } from "next/navigation";

export default function LogInForm() {
  const { setWarningError } = useContext(ThemeContext);
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const loginHandler = async () => {
    if (!username || !pass) {
      setWarningError(
        "Щоб авторизуватися, введіть username та пароль у відповідні поля"
      );
      return false;
    }

    setIsLoading(true);

    const authData = await AuthService.login(username, pass);
    console.log(authData);

    if (authData?.status === 200) {
      // setTelegramBotData(botInfoResponse?.data);

      if (authData?.data) {
        const newSession = await fetch("/api/session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: authData?.data?._id,
            role: "admin",
          }),
        });

        if (newSession) {
          redirect("/dashboard");
        }
      } else {
        setWarningError(
          "Помилка авторизації! Перевірте свої дані та спробуйте ще раз!"
        );
      }
    } else {
      setWarningError(
        "Помилка авторизації! Перевірте свої дані та спробуйте ще раз!"
      );
    }

    setIsLoading(false);
  };

  return (
    <section className="bg-gray-50 h-full dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0 h-full">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Увійдіть в свій аккаунт
            </h1>
            <div>
              <label htmlFor="email" className="input-label">
                Ваш username
              </label>
              <input
                type="email"
                id="email"
                className="input"
                placeholder="username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
            </div>
            <div>
              <label htmlFor="password" className="input-label">
                Пароль
              </label>
              <input
                type="password"
                id="password"
                placeholder="••••••••"
                className="input"
                onChange={(e) => setPass(e.target.value)}
                value={pass}
              />
            </div>
            {isLoading && <Spinner />}
            <button
              className={`button ${
                isLoading || !username || !pass ? "disabled" : ""
              }`}
              onClick={loginHandler}
              disabled={isLoading || !username || !pass}
            >
              Увійти
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
