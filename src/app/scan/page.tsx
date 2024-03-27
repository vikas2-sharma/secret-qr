"use client";
import React, { useEffect, useRef, useState } from "react";
import Card from "../components/ui/Card";
import QrScanner from "qr-scanner";
import ButtonUI from "../components/ui/Button";

function Page() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [qrText, setQrText] = useState("");
  let prevResult = "";

  setTimeout(() => {
    console.log(videoRef.current);

    if (videoRef.current) {
      const videoEle: HTMLVideoElement = videoRef.current;
      const qrScanner = new QrScanner(
        videoEle,
        (result) => {
          if (prevResult != result.data) {
            console.log(result.data);
            setQrText(result.data);
            prevResult = result.data;
          }
        },
        {
          onDecodeError: (error) => {},
          maxScansPerSecond: 5,
          highlightScanRegion: true,
          highlightCodeOutline: true,
        }
      );
      qrScanner.start();
    }
  }, 100);

  const onCapture = () => {};

  return (
    <div>
      <Card className="flex justify-center bg-emerald-900 flex-col items-center">
        <h3 className="mb-4 font-bold">Scan</h3>
        <video
          ref={videoRef}
          id="videoElement"
          width={"400px"}
          height={"400px"}
        ></video>
        <ButtonUI onClick={onCapture}>capture</ButtonUI>
        <p className="w-full">{qrText}</p>
      </Card>
    </div>
  );
}

export default Page;
