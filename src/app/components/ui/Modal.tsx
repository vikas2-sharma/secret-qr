import React, { ReactNode, useEffect, useRef } from "react";

function Modal({
  children,
  isOpen,
  close,
}: {
  children: ReactNode;
  isOpen: boolean;
  close?: () => void;
}) {
  console.log(isOpen);
  const closeOnEscape = (evt: any) => {
    console.log(evt);
  };

  const popupRef = useRef();

  return isOpen ? (
    <div
      onKeyDown={(evt) => {
        console.log("key press", evt.key.toLocaleLowerCase() == "escape");
      }}
      className="z-[999] bg-[#000000a6] fixed top-0 left-0 w-screen h-screen grid place-items-center"
    >
      {children}
    </div>
  ) : undefined;
}

export default Modal;
