import { Header } from "@/components/header/header";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "700"]
});

const interTight = Inter({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["700"]
});

export const metadata: Metadata = {
  title: "Mundo Pet",
  description: "Sistema de genrenciamento de atendimento de Pet-Shop",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} ${interTight.variable}  antialiased`}>
        <div className="max-w-3xl mx-auto">
          <Header />
          <main className="flex flex-col flex-1 mt-12">
            {children}
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={true} closeOnClick={true} rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
          </main>
        </div>
      </body>
    </html>
  );
}
