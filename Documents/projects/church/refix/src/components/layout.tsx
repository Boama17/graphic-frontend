import React, { ReactNode } from "react";
import NavBar from "./navbar";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="w-full h-full overflow-x-hidden relative">
      <div className="z-50 fixed top-0 w-full">
        <NavBar />
      </div>
      <main className="w-full h-full">{children}</main>
    </div>
  );
}