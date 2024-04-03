import React, { ReactNode, useEffect, useRef } from "react";

function Modal({
  children,
  isOpen,
  className,
  close,
}: {
  children: ReactNode;
  isOpen: boolean;
  className?: string;
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
      className={`${className} z-[999] bg-[#000000a6] fixed top-0 left-0 w-screen h-screen`}
    >
      {children}
    </div>
  ) : undefined;
}

export default Modal;
