import type { Metadata } from "next";
import Register from "@/features/auth/register";

export const metadata: Metadata = {
  title: "Create account",
  description: "Create a new Vendra account.",
};

function Page() {
  return <Register />;
}

export default Page;
