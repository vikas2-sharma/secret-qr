import { ReactNode } from "react";

export default function Card({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`border-1 p-4 shadow-lg rounded-lg m-4 ${className}`}>
      {children}
    </div>
  );
}
