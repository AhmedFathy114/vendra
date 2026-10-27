import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Profile from "@/features/profile/profile";
import { auth } from "@/lib/auth";

export const metadata: Metadata = {
  title: "My Profile",
  description: "View your Vendra account details.",
};

async function Page() {
  const session = await auth();

  if (!session?.user) redirect("/login");

  return <Profile />;
}

export default Page;
