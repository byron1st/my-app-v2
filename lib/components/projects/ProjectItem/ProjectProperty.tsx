import { Text, Flex } from "@radix-ui/themes";
import { RadixIcon } from "@/lib/types";

export default function ProjectProperty({
  Icon,
  value,
}: {
  Icon: RadixIcon;
  value: string;
}) {
  return (
    <Flex align="center" gap="1">
      <Icon width={12} height={12} />
      <Text size="1" color="gray">
        {value}
      </Text>
    </Flex>
  );
}
