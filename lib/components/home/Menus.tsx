"use client";

import MenuButton from "@/lib/components/home/MenuButton";
import { MixIcon, QuestionMarkIcon } from "@radix-ui/react-icons";
import { Flex } from "@radix-ui/themes";

export default function Menus() {
  return (
    <Flex gap="4">
      <MenuButton Icon={MixIcon} label="projects" href="/projects" />
      <MenuButton Icon={QuestionMarkIcon} label="about" href="/about" />
    </Flex>
  );
}
