import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Secret QR",
  description: "create qr code from text with encryption",
};

export default function RootLayout({
  children,
  req,
}: Readonly<{
  children: React.ReactNode;
  req?: any;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} scrollbar`} style={{ color: "red" }}>
        {children}
      </body>
    </html>
  );
}
