import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "@/components";

interface Props {
  children?: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <Outlet />
      {children}
    </>
  );
};

export default Layout;
