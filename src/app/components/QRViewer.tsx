import React from "react";
import QRCode from "react-qr-code";

function QRViewer({
  value,
  className,
}: {
  value: string | undefined;
  className?: string;
}) {
  console.log("qr viewer :" + value);
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
