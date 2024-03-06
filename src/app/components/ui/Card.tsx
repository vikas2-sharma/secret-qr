import { ReactNode } from "react";
import { getTableList } from "secret-qr/db/fetchData";

export default async function Card({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  // // const list = await getTableList();
  // list.rows.forEach((item) => {
  //   console.log(item.month);
  // });
  return (
    <div className={`border-1 p-4 shadow-lg rounded-lg m-4 ${className}`}>
      {children}
    </div>
  );
}
