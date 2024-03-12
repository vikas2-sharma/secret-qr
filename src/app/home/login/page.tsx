"use client";
import React, { FormEvent, FormEventHandler, ReactNode, useState } from "react";
import Card from "secret-qr/app/components/ui/Card";

function Page({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(false);
  const onLoginSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    console.log("handle form");

    // setLoading(true);
    const formData = new FormData(evt.currentTarget);
    const username = formData.get("username")?.toString();
    const password = formData.get("password")?.toString();
    console.log(username);
    console.log(password);

    //********* */
    history.back();
    //********* */
  };

  return (
    <>
      <div className="absolute top-0 left-0 w-[100lvw] h-[100lvh] bg-[#000000a6] z-10 grid place-items-center">
        <Card className="z-[1000] text-color-primary bg-color-secondary transition-all flex flex-col items-center">
          <h4>Login</h4>
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
              className="p-3 border border-color-primary my-2 rounded-lg font-bold"
              type="submit"
            >
              {"Login"}
            </button>
          </form>
          <button
            className="p-3 border border-color-primary my-2 rounded-lg font-bold"
            onClick={() => {
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
