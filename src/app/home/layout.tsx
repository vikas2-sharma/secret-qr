import React, { ReactNode } from "react";
import Header from "../components/header";
import HomeContent from "../components/HomeContent";

function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-0">
        <div className="z-10 w-full items-center justify-between font-mono text-sm lg:flex">
          <Header />

          <div className="w-full h-full absolute top-16 sm:p-8 p-4">
            <HomeContent />
          </div>
        </div>
      </main>
      {children}
    </>
  );
}

export default Layout;
