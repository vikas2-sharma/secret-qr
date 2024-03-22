import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  redirect("/home");
  const cookiess = cookies().get("User-cookie")?.value || "";
  let redirectPath = "/home/login";

  const myHeaders = new Headers();
  myHeaders.append("User-cookie", cookiess || "");

  try {
    const res = await fetch("http://localhost:3000/api/getverify", {
      method: "GET",
      credentials: "include",
      headers: myHeaders,
    });

    console.log({ status: res.status });
    if (res.status == 200) redirectPath = "/home";
    else redirectPath = "/home/login";
    // redirect("/home", RedirectType.push);
  } catch (error) {
    console.log({ error });
    redirectPath = "/home/login";
  } finally {
    redirect(redirectPath);
  }
}
