"use client";

import type { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { Toaster } from "@/components/ui/sonner";

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            retry: 2,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <AppShell>{children}</AppShell>
      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            background: 'hsl(var(--wheat))',
            color: 'hsl(var(--seaweed))',
            border: '1px solid hsl(var(--warm-beige) / 0.3)',
            borderRadius: '1rem',
          },
        }}
      />
    </QueryClientProvider>
  );
}
