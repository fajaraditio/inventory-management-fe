import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`antialiased bg-gray-50`}
      >
        <NextUIProvider>
          {children}
        </NextUIProvider>
      </body>
    </html>
  );
}
