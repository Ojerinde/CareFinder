"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";
import AppContextProvider from "@/store/AppContext";
import "@/stylesheets/main.scss";

interface ProviderProps {
  children: React.ReactNode;
  session: any;
}

// THis will provide the context and also the NextAuth session.
export default function Providers({ children, session }: ProviderProps) {
  return (
    <SessionProvider session={session}>
      <AppContextProvider>{children} </AppContextProvider>
    </SessionProvider>
  );
}
