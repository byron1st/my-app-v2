import UnorderedList from "@/lib/components/common/UnorderedList";
import ProjectDetailItem from "@/lib/components/project/ProjectDetail/ProjectDetailItem";
import { Text } from "@radix-ui/themes";

export default function SimpleListItem({
  label,
  list,
}: {
  label: string;
  list: string[];
}) {
  return (
    <ProjectDetailItem label={label}>
      <UnorderedList>
        {list.map((item, index) => (
          <li key={`label_${index}`}>
            <Text size="2">{item}</Text>
          </li>
        ))}
      </UnorderedList>
    </ProjectDetailItem>
  );
}
