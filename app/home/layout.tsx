"use client";
import React from "react";
import Header from "@/components/Header/Header";

// The layout file by default receives other files as children.
interface HomeLayout {
  children: React.ReactNode;
}

export default function Layout({ children }: HomeLayout) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}
