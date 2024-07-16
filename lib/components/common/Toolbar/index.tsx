"use client";

import { Flex } from "@radix-ui/themes";
import { usePathname } from "next/navigation";
import ColorModeSelector from "@/lib/components/common/Toolbar/ColorModeSelector";
import HomeButton from "@/lib/components/common/Toolbar/HomeButton";

export default function Toolbar() {
  const pathname = usePathname();

  return (
    <Flex width="100%" height="40px" justify="between" align="center" px="2">
      <Flex gap="2" align="center">
        {pathname === "/" ? null : <HomeButton />}
        <ColorModeSelector />
      </Flex>
    </Flex>
  );
}
