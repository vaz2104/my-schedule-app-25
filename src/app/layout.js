import Script from "next/script";
import "./globals.css";

export const metadata = {
  title: "",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html
      className=""
      lang="en"
      style={{
        "--tg-viewport-height": "100vh",
        "--tg-viewport-stable-height": "100vh",
      }}
    >
      <body>
        {children}

        <Script
          src="https://telegram.org/js/telegram-web-app.js"
          strategy="beforeInteractive"
        />
      </body>
    </html>
  );
}
