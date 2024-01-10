"use client";

import React from "react";
import { Theme } from "@radix-ui/themes";
import { ThemeProvider } from "next-themes";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class">
      <Theme>{children}</Theme>
    </ThemeProvider>
  );
}
