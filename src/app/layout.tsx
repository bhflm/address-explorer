import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google"
import "./globals.css";

import { cn } from "../lib/utils";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Address Explorer",
  description: "Ethereum Address Explorer that showcases any address or ens NFT",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(
          "bg-slate-100 dark:bg-slate-800 in-h-screen font-sans antialiased",
          fontSans.variable
        )}>{children}</body>
    </html>
  );
}
