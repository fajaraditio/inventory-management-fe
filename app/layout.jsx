import { getLocale, getMessages } from "next-intl/server";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";

const RootLayout = async ({ children }) => {
  const locale = await getLocale();

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`antialiased bg-gray-50`}
      >
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export default RootLayout;
