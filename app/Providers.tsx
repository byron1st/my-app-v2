"use client";

import { Theme } from "@radix-ui/themes";
import { ThemeProvider } from "next-themes";
import React from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class">
      <Theme>{children}</Theme>
    </ThemeProvider>
  );
}
