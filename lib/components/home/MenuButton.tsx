"use client";

import { Text, Flex, IconButton } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { RadixIcon } from "@/lib/types";

export default function MenuButton({
  Icon,
  label,
  href,
}: {
  Icon: RadixIcon;
  label: string;
  href: string;
}) {
  const router = useRouter();

  const moveTo = () => {
    router.push(href);
  };

  return (
    <Flex direction="column" align="center">
      <IconButton radius="full" variant="soft" onClick={moveTo}>
        <Icon width={18} height={18} />
      </IconButton>

      <Text size="1" weight="light">
        {label}
      </Text>
    </Flex>
  );
}
