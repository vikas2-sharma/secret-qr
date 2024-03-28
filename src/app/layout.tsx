import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Secret QR",
  description: "create qr code from text with encryption",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} scrollbar`} style={{}}>
        <main className="flex min-h-screen flex-col items-center justify-between p-0">
          <div className="z-10 w-full items-center justify-between font-mono text-sm lg:flex">
            <Header />

            <div className="w-full h-full absolute top-16 sm:p-8 p-4">
              {/* <HomeContent /> */}
              {children}
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
