"use client";

import { useEffect, useState } from "react";
import Loading from "./Loading";

export default function FirstLoading() {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const exitTimer = window.setTimeout(() => {
      setIsExiting(true);
    }, 2000);

    return () => window.clearTimeout(exitTimer);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-99999 transition-opacity duration-700 ease-in-out ${
        isExiting ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      aria-hidden={isExiting}
    >
      <Loading isExiting={isExiting} />
    </div>
  );
}
