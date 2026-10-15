import { Metadata } from "next";
import { Montserrat, Geist } from "next/font/google";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import Providers from "@/Providers";
import AppShell from "@/components/Loaders/AppShell";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: {
    template: "%s | Vendra",
    default: "Vendra",
  },

  description:
    "Discover modern fashion essentials designed for everyday style. Shop curated clothing, accessories, and more with a seamless online shopping experience.",
};

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  style: "normal",
});

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={cn(
        "scrollbar-thumb-gray-600 scrollbar-thin ",
        "font-sans",
        geist.variable,
      )}
      suppressHydrationWarning
    >
      <body
        className={`${montserrat.className} min-h-screen flex flex-col antialiased relative overflow-x-hidden`}
      >
        <Providers>
          <AppShell>
            <div className="flex-1 pb-16 lg:pb-0">
              <main className="pt-24 pb-20 lg:pt-35 lg:pb-0">{children}</main>
            </div>
          </AppShell>
        </Providers>
      </body>
    </html>
  );
}

export default RootLayout;
