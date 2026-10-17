"use client";

import { useEffect } from "react";
import { Navbar } from "@/components/AppLayout/navbar";
import Footer from "../AppLayout/Footer";
import FirstLoading from "../Loaders/FirstLoading";

export default function AppShell({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const root = document.documentElement;

    if (root.getAttribute("data-splash") !== "true") return;

    const timer = window.setTimeout(() => {
      sessionStorage.setItem("app-loader-shown", "true");
      root.removeAttribute("data-splash");
    }, 2700);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      <Navbar />
      {children}
      <Footer />

      <div className="app-splash fixed inset-0 z-99999" aria-hidden="true">
        <FirstLoading />
      </div>
    </>
  );
}
