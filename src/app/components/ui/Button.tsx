import React, { ReactNode } from "react";

type buttonType = "submit" | "reset" | "button" | undefined;
function ButtonUI({
  children,
  onClick,
  className,
  type,
  theme,
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  type?: buttonType;
  theme?: "light" | "dark";
}) {
  return (
    <>
      <button
        className={`${
          theme == undefined || theme == "light"
            ? "bg-color-primary text-color-secondary"
            : "bg-color-secondary text-color-primary"
        } font-bold w-fit px-4 py-3 rounded-md my-2 ${className}`}
        onClick={onClick}
        type={type}
      >
        {children}
      </button>
    </>
  );
}

export default ButtonUI;
