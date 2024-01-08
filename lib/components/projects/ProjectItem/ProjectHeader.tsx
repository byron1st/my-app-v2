import { Flex, Heading, Text } from "@radix-ui/themes";

export default function ProjectHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <Flex direction="column">
      <Heading size="3" trim="start">
        {title}
      </Heading>
      <Text size="1" color="gray" trim="start">
        {description}
      </Text>
    </Flex>
  );
}
