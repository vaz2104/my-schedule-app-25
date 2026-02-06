import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "next-themes";

export const metadata = {
  title: "",
  description: "",
};

export default async function RootLayout({ children }) {
  return (
    <html
      className=""
      lang="en"
      style={{
        "--tg-viewport-height": "100vh",
        "--tg-viewport-stable-height": "100vh",
      }}
      suppressHydrationWarning
    >
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, interactive-widget=resizes-content"
      ></meta>
      <body>
        <ThemeProvider attribute="data-theme" defaultTheme="blue" enableSystem>
          {children}
        </ThemeProvider>

        <Script
          src="https://telegram.org/js/telegram-web-app.js"
          strategy="beforeInteractive"
        />
      </body>
    </html>
  );
}
