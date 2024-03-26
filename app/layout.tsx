import { Providers } from "@/components/Providers/providers";
import { ReactNode } from "react";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata = {
  title: "MYSIM",
  description:
    "MYSIM is a myanmar community for burmese students at Singapore Institute of Manage (SIM).",
  keywords: ["mysim", "myanamr", "sim", "singapore", "community"],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white dark:bg-secondary">
        <Providers>
          <div className="font-ibm_plex_sans text-secondary dark:text-white">
            {children}
          </div>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
