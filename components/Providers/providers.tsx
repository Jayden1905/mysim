"use client";
import React, { useEffect, useState } from "react";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const queryClient = new QueryClient();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    setLoading(false);
  }, []);

  if (loading) {
    return null;
  }

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider
          disableTransitionOnChange
          attribute="class"
          defaultTheme="system"
        >
          <AnimatePresence mode="wait" key={pathname}>
            {children}
          </AnimatePresence>
        </ThemeProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
