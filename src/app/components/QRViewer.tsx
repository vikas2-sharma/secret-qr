import React from "react";
import QRCode from "react-qr-code";
import Card from "./ui/Card";

function QRViewer({
  value,
  className,
}: {
  value: string | undefined;
  className?: string;
}) {
  return (
    <>
      <QRCode value={value !== undefined ? value : ""} className={className} />
    </>
  );
}

export default QRViewer;
