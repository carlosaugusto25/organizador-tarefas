import type { Metadata } from "next";
import "./globals.scss";
import styles from "./page.module.scss";
import { Inter_Tight } from 'next/font/google';
import { useEffect, useState } from "react";

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

  return (
    <html lang="pt-br">
      <body className={`${interTight.variable}`}>
        {children}
      </body>
    </html>
  );
}
