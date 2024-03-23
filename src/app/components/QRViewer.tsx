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
      {value != undefined && value?.length > 0 ? (
        <QRCode
          value={value !== undefined ? value : ""}
          className={className}
        />
      ) : undefined}
    </>
  );
}

export default QRViewer;
