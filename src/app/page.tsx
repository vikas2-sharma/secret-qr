import Image from "next/image";
import Header from "./components/header";
import HomeContent from "./components/HomeContent";
import { getTableList, getVerified } from "secret-qr/db/fetchData";
import { redirect } from "next/navigation";

export default async function Home() {
  // console.log(process.env.BASEURL);

  await fetch("http://localhost:3000/api/getverify")
    .then((res) => {
      console.log(res);
      if (res.status == 200) {
        redirect("/home");
      } else {
        redirect("/home/login");
      }

      // res.json();
    })
    .catch((e) => {
      console.log(e);
      redirect("/home/login");
    });
}
