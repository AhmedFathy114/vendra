"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/navigation/navbar";
import FirstLoading from "./FirstLoading";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const hasShown = sessionStorage.getItem("app-loader-shown");

    if (hasShown) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setReady(true);
      return;
    }

    setShowLoader(true);

    const timer = window.setTimeout(() => {
      sessionStorage.setItem("app-loader-shown", "true");
      setShowLoader(false);
      setReady(true);
    }, 2700);

    return () => window.clearTimeout(timer);
  }, []);

  if (!ready) {
    return showLoader ? <FirstLoading /> : null;
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
