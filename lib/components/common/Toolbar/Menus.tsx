"use client";

import { MixIcon, QuestionMarkIcon, ReaderIcon } from "@radix-ui/react-icons";
import { Flex } from "@radix-ui/themes";
import MenuButton from "@/lib/components/common/Toolbar/MenuButton";

export default function Menus() {
  return (
    <Flex gap="1" align="center">
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
