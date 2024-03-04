import Image from "next/image";
import Header from "./components/header";
import HomeContent from "./components/HomeContent";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-0">
      <div className="z-10 w-full items-center justify-between font-mono text-sm lg:flex">
        <Header />

        <div className="w-full h-full absolute top-16 p-8">
          <HomeContent />
        </div>
      </div>
    </main>
  );
}
