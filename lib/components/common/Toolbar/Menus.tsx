"use client";

import { MixIcon, QuestionMarkIcon } from "@radix-ui/react-icons";
import { Flex } from "@radix-ui/themes";
import MenuButton from "@/lib/components/common/Toolbar/MenuButton";

export default function Menus() {
  return (
    <Flex gap="1" align="center">
      <MenuButton Icon={MixIcon} label="projects" href="/projects" />
      <MenuButton Icon={QuestionMarkIcon} label="about" href="/about" />
    </Flex>
  );
}
