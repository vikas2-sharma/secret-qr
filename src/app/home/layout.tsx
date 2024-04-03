import React, { ReactNode } from "react";
import Header from "../components/header";
import HomeContent from "../components/HomeContent";

function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export default Layout;
