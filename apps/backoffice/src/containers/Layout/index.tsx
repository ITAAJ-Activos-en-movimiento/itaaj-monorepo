import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "@/components";
import Sidebar from "@/components/Layout/Sidebar";
import styles from './Layout.module.css'

interface Props {
  children?: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.content}>
        <Sidebar />
        <main>
          <Outlet />
          {children}
        </main>
      </div>

    </div>
  );
};

export default Layout;
