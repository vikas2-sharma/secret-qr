"use client";
import React, { FormEvent, useState } from "react";
import ButtonUI from "./ui/Button";
import Card from "./ui/Card";
import Modal from "./ui/Modal";
import { useRouter } from "next/navigation";
// import { useRouter } from "next/router";
// import { useRouter } from "next/router";

function ProfileButton({ user }: { user?: string }) {
  let subtitle;
  const [isOpen, setOpen] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  console.log(user);
  const onLoginSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    console.log("handle form");
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
        // isOpen(false);
        setOpen(false);
        router.refresh();

        // setTimeout(() => {

        //   //   router.replace("/home");
        // }, 10);
        // router.replace("/home");
        // history.back();
      })
      .catch((error) => console.error(error));

    //********* */
  };

  const handleProfile = () => {
    console.log("handle profile");
  };

  const openLogin = () => {
    setOpen(true);
  };

  const closeLogin = () => {
    setOpen(false);
  };
  return (
    <>
      {user ? (
        <ButtonUI theme="dark" onClick={handleProfile}>{`${user} >`}</ButtonUI>
      ) : (
        <>
          <ButtonUI theme="dark" onClick={openLogin}>
            {"Login"}
          </ButtonUI>
          <Modal isOpen={isOpen} close={closeLogin}>
            <Card className="z-[1000] text-color-primary bg-color-secondary transition-all flex flex-col items-center">
              <h6>Login</h6>
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
          </Modal>
        </>
      )}
    </>
  );
}

export default ProfileButton;
