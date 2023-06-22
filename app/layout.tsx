"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";
import AppContextProvider from "@/store/AppContext";
import "@/stylesheets/main.scss";

// The layout file by default receives other files as children.
interface RootLayoutProps {
  children: React.ReactNode;
  session: any;
}

export default function RootLayout({ children, session }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>
          <AppContextProvider>
            <main>{children}</main>
          </AppContextProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
