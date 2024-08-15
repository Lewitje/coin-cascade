import "./globals.css";

export const metadata = {
  title: "Coin Cascade | Lewi Hussey",
  description: "A purely fictional crypto game made by Lewi Hussey",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
