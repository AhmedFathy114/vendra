import type { Metadata } from "next";
import Login from "@/features/auth/login";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your Vendra account.",
};

function Page() {
  return <Login />;
}

export default Page;
