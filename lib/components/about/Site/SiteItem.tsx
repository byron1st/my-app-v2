import { Card, Flex, Text } from "@radix-ui/themes";

export default function SiteItem({
  label,
  title,
}: {
  label: string;
  title: string;
}) {
  return (
    <Card style={{ minWidth: "100px" }}>
      <Flex direction="column" flexShrink="0">
        <Text size="1" color="gray" weight="light" as="div">
          {label}
        </Text>
        <Text size="2" as="div">
          {title}
        </Text>
      </Flex>
    </Card>
  );
}
