"use client";

import { IconProps } from "@radix-ui/react-icons/dist/types";
import { Text, Flex, IconButton } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

export default function MenuButton({
  Icon,
  label,
  href,
}: {
  Icon: React.ForwardRefExoticComponent<
    IconProps & React.RefAttributes<SVGSVGElement>
  >;
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
