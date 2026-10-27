import type { Metadata } from "next";
import Cart from "@/features/cart/cart";
import { auth } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Shopping cart",
  description: "Review the items in your Vendra shopping cart.",
};

async function Page() {
  const session = await auth();
  const userId = Number(session?.user?.id);

  return (
    <Cart userId={Number.isInteger(userId) && userId > 0 ? userId : null} />
  );
}

export default Page;
