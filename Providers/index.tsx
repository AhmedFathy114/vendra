"use client";

import QueryProvider from "./queryProvider";
import { ThemeProvider } from "./theme-provider";
import { SessionProvider } from "next-auth/react";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        <QueryProvider>{children}</QueryProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}

export default Providers;
