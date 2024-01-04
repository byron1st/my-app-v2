import { Flex, Text } from "@radix-ui/themes";
import { useMemo } from "react";

export default function Footer() {
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <Flex width="100%" align="center" justify="center">
      <Text size="1" weight="light" color="gray">
        Copyright {currentYear}. Hwi Ahn. All rights reserved.
      </Text>
    </Flex>
  );
}
