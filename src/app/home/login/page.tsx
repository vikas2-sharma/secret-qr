"use client";
import { useRouter } from "next/navigation";
import React, {
  FormEvent,
  FormEventHandler,
  ReactNode,
  useEffect,
  useState,
} from "react";
import Card from "secret-qr/app/components/ui/Card";

function Page() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const onLoginSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    console.log("handle form");

    // setLoading(true);
    const formData = new FormData(evt.currentTarget);
    const username = formData.get("username")?.toString();
    const password = formData.get("password")?.toString();
    console.log(username);
    console.log(password);

    setLoading(true);

    //********* */

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      username: username,
      password: password,
    });

    const requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("/api/login", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        setLoading(false);
        router.refresh();
        setTimeout(() => {
          router.replace("/home");
        }, 100);
        // router.replace("/home");
        // history.back();
      })
      .catch((error) => console.error(error));

    //********* */
  };

  // const bodyStyle = document
  //   .getElementsByTagName("body")[0]
  //   .getAttribute("style");
  // console.log({ bodyStyle });

  // useEffect(() => {
  //   document
  //     .getElementsByTagName("body")[0]
  //     .setAttribute("style", `overflow:hidden;${bodyStyle}`);

  //   return () => {
  //     document
  //       .getElementsByTagName("body")[0]
  //       .setAttribute("style", `${bodyStyle}`);
  //   };
  // }, []);
  return (
    <>
      <div className="absolute top-0 left-0 w-[100lvw] h-[100lvh] bg-[#000000a6] z-10 grid place-items-center">
        <Card className="z-[1000] text-color-primary bg-color-secondary transition-all flex flex-col items-center">
          <h5>Login</h5>
          <form onSubmit={onLoginSubmit} className="flex flex-col">
            <input
              className="p-3 border border-color-primary my-2 rounded-lg"
              type="text"
              name="username"
              placeholder="Username"
            />
            <input
              className="p-3 border border-color-primary my-2 rounded-lg"
              type="password"
              name="password"
              placeholder="Password"
            />
            <button
              className="p-3 border border-color-primary my-2 rounded-lg font-bold bg-color-primary hover:bg-color-primary-hover text-color-secondary hover:text-color-secondary-hover disabled:cursor-not-allowed"
              type="submit"
              disabled={loading}
            >
              {loading ? "Processing" : "Login"}
            </button>
          </form>
          <button
            className="p-3 border border-color-primary my-2 rounded-lg font-bold"
            onClick={() => {
              setLoading(!loading);
              console.log("sign");
            }}
          >
            {"Sign up"}
          </button>
        </Card>
      </div>
    </>
  );
}

export default Page;
