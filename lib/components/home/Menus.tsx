"use client";

import MenuButton from "@/lib/components/home/MenuButton";
import { MixIcon, QuestionMarkIcon, ReaderIcon } from "@radix-ui/react-icons";
import { Flex } from "@radix-ui/themes";

export default function Menus() {
  return (
    <Flex gap="4">
      <MenuButton
        Icon={ReaderIcon}
        label="posts"
        href="https://velog.io/@byron1st"
      />
      <MenuButton Icon={MixIcon} label="projects" href="/projects" />
      <MenuButton Icon={QuestionMarkIcon} label="about" href="/about" />
    </Flex>
  );
}
