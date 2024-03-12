import Image from "next/image";
import Header from "./components/header";
import HomeContent from "./components/HomeContent";
import { getTableList } from "secret-qr/db/fetchData";
import { redirect } from "next/navigation";

export default function Home() {
  // console.log(process.env.BASEURL);
  redirect("/home");
}
