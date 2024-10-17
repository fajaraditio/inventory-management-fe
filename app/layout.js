import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`antialiased bg-gray-50`}
      >
        {children}
      </body>
    </html>
  );
}
