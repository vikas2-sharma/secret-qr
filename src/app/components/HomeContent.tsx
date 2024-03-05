"use client";
import React, { FormEvent, useRef, useState } from "react";
import Card from "./ui/Card";
import HeaderItem from "./ui/headerItem";
import QRViewer from "./QRViewer";
import ButtonUI from "./ui/Button";

function HomeContent() {
  const [qrvalue, setQrValue] = useState<string>("");
  let value: string | undefined;
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    value = formData.get("qrtext")?.toString();
    console.log(formData);
    setQrValue(value !== undefined ? value : "");
  };
  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-center w-full ">
        <Card className="sm:w-[40lvw] sm:min-h-[70lvh] sm:h-fit relative w-full">
          <h5 className="underline">Enter a text to generate QR</h5>
          <form className="flex flex-col py-4 mt-8" onSubmit={onSubmit}>
            <textarea
              id="qrtext"
              name="qrtext"
              className="outline-none bg-color-secondary-hover border-b-2 border-color-primary p-2 text-color-primary scroll-m-0"
              placeholder=""
            />
            <ButtonUI type="submit" className="self-center mt-8">
              Generate
            </ButtonUI>
          </form>
        </Card>
        <Card className="sm:w-[40lvw] sm:min-h-[70lvh] sm:h-fit relative w-full grid place-items-center">
          <QRViewer value={qrvalue} className="p-4 bg-white" />
        </Card>
      </div>
    </>
  );
}

export default HomeContent;
