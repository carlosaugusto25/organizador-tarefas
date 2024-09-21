import type { Metadata } from "next";
import "./globals.scss";
import styles from "./page.module.scss";
import Image from "next/image";
import { Inter_Tight } from 'next/font/google';
import { days, months } from "@/utils/dates";

const interTight = Inter_Tight({ 
  subsets: ["latin"],
  variable: "--font-inter-tight",
  weight: ["100","200","300","400","500","600","700","800","900"],
});

export const metadata: Metadata = {
  title: "Tarefas",
  description: "Teste Dev Junior",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const date = new Date();

  return (
    <html lang="pt-br">
      <body className={`${interTight.variable}`}>
        <header className={styles.header}>
          <div className={styles.content}>
            <Image src="/assets/logo.png" alt="Logo" width={150} height={36} />
            <h1>Bem-vindo de volta, Marcus</h1>
            <p>{`${days[date.getDay()]}`}, {`${date.getDate()}`} de {`${months[date.getMonth()]}`} de {date.getFullYear()}</p>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
