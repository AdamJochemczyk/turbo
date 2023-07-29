import React from "react";
import { Montserrat } from "next/font/google";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@web/lib/authOptions";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
   const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body
        className={`${montserrat.className}`}
      >
        {children}
        {/* <Provider session={session}>{children}</Provider> */}
      </body>
    </html>
  );
}
