"use client";

import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { Box, IconButton } from "@radix-ui/themes";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ColorModeSelector() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  const toggleColorTheme = () => {
    if (resolvedTheme === "light") setTheme("dark");
    if (resolvedTheme === "dark") setTheme("light");
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? (
    <Box position="absolute" style={{ top: 10, left: 10 }}>
      <IconButton variant="ghost" radius="full" onClick={toggleColorTheme}>
        {resolvedTheme === "light" ? (
          <SunIcon width={18} height={18} />
        ) : resolvedTheme === "dark" ? (
          <MoonIcon width={18} height={18} />
        ) : null}
      </IconButton>
    </Box>
  ) : null;
}
