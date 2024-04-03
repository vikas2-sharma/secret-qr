"use client";
import React, { FormEvent, useState } from "react";
import Card from "./ui/Card";
import QRViewer from "./QRViewer";
import ButtonUI from "./ui/Button";
import { fetchJson } from "secret-qr/net/netUtils";
import { QrResponse } from "../../../apiutils/definitions";

function HomeContent() {
  const [qrvalue, setQrValue] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);
  let value: string | undefined;
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    value = formData.get("qrtext")?.toString() || "";
    console.log(formData);

    setLoading(true);
    fetchJson("/api/encryptqr", { rawqr: value })
      .then((result: QrResponse) => {
        console.log(result);
        setLoading(false);
        if (result.code === "6000") {
          console.log("qr generate successfully");

          setQrValue(result.encryptedqr || "");
          console.log("adssd", qrvalue);
        } else {
          alert("QR generate Failed" + result.message);
        }
      })
      .catch((e) => {
        setLoading(false);
        alert("QR generate Failed" + e);
      });
  };
  console.log({ qrvalue });
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
              {isLoading ? "Generating..." : "Generate"}
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
