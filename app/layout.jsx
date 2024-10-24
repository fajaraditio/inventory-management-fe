import "./globals.css";

const RootLayout = ({ children }) => {
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

export default RootLayout;
