import { Flex, Heading, Text } from "@radix-ui/themes";
import UnorderedList from "@/lib/components/common/UnorderedList";
import ProjectDetailItem from "@/lib/components/project/ProjectDetail/ProjectDetailItem";

export default function ListWithHeaderItem({
  label,
  list,
}: {
  label: string;
  list: { header: string; values: string[] }[];
}) {
  return (
    <ProjectDetailItem label={label}>
      <Flex direction="column">
        {list.map(({ header, values }, idx) => (
          <Flex
            direction="column"
            pt={idx === 0 ? "0" : "2"}
            key={`challenge_${idx}`}
          >
            <Heading size="2">{header}</Heading>
            <UnorderedList paddingInlineStart="24px">
              {values.map((item, index) => (
                <li key={`solution_${index}`}>
                  <Text size="2">{item}</Text>
                </li>
              ))}
            </UnorderedList>
          </Flex>
        ))}
      </Flex>
    </ProjectDetailItem>
  );
}
