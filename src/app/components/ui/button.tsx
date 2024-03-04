import React, { ReactNode } from "react";

type buttonType = "submit" | "reset" | "button" | undefined;
function Button({
  children,
  onClick,
  className,
  type,
}: {
  children: ReactNode;
  onClick?: () => {};
  className?: string;
  type?: buttonType;
}) {
  return (
    <>
      <button
        className={`bg-color-primary text-color-secondary w-fit px-4 py-3 rounded-md my-2 ${className}`}
        onClick={onClick}
        type={type}
      >
        {children}
      </button>
    </>
  );
}

export default Button;
