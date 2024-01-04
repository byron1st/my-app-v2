import { Em, Flex, Text } from "@radix-ui/themes";
import UnorderedList from "@/lib/components/common/UnorderedList";

export default function InterestList({
  list,
  title,
}: {
  list: string[];
  title: string;
}) {
  return (
    <Flex direction="column" mb="2">
      <Text size="2">
        <Em>{title}</Em>
      </Text>

      <UnorderedList paddingInlineStart="24px">
        {list.map((i, index) => (
          <li key={`dev_${index}`}>
            <Text>{i}</Text>
          </li>
        ))}
      </UnorderedList>
    </Flex>
  );
}
