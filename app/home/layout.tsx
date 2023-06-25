"use client";
import Header from "@/components/Header/Header";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "@/store/AppContext";
import LoadingSpinner from "../login/LoadingSpinner/LoadingSpinner";

// The layout file by default receives other files as children.
interface HomeLayout {
  children: React.ReactNode;
}

export default function Layout({ children }: HomeLayout) {
  // Extracting data from the contaext/
  const { isLoggedIn } = useContext(AppContext);

  // Aunthentication check for automatice redirection
  const router = useRouter();
  const [pageIsLoading, setPageIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!isLoggedIn.isLoggedIn) {
      router.push("/");
    } else {
      setPageIsLoading(() => false);
    }
  }, []);

  if (pageIsLoading) return <LoadingSpinner />;

  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}
