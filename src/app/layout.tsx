import React from "react";

import type { Metadata } from "next";
import "./globals.css";

import { cn, fontSans } from "../utils/utils";

export const metadata: Metadata = {
  title: "Address NFT Explorer",
  description: "Ethereum Address Explorer that showcases any address or ens NFT",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("bg-black in-h-screen font-sans antialiased", fontSans.variable)}>
        {children}
      </body>
    </html>
  );
}
