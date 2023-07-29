"use client";

import { Test } from "@web/app/(components)/Test";
import { SessionProvider } from "next-auth/react";

export default function Provider({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}): React.ReactNode {
  return <SessionProvider session={session}><Test /></SessionProvider>;
}
