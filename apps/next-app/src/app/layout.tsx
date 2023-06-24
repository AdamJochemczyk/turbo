import "../styles/globals.css";
import React from "react";
import SuperTokensWebJs from "supertokens-web-js";
import { frontendConfig } from "../../config/frontendConfig";

if (typeof window !== "undefined") {
  // we only want to call this init function on the frontend, so we check typeof window !== 'undefined'
  SuperTokensWebJs.init(frontendConfig());
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
