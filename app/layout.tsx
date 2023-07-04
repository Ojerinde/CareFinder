import React from "react";
import Providers from "./Provider";

export const metadata = {
  title: "CareFinder: Hospital search engine",
  description: "Search for an hospital with ease",
};

// The layout file by default receives other files as children.
interface RootLayoutProps {
  children: React.ReactNode;
  session: any;
}
export default function RootLayout({ children, session }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <Providers session={session}>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
