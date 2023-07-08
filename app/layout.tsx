import ModalProvider from "./components/modals/ModalProvider";
import { ToasterContext } from "./context/ToasterContext";
import "./globals.css";
import { Inter } from "next/font/google";
import { NextAuthProvider } from "./providers/NextAuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Todo App",
  description: "Build Todo App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ModalProvider />
        <ToasterContext />
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
}
