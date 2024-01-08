import ProjectDetailItem from "@/lib/components/project/ProjectDetail/ProjectDetailItem";
import { Flex, Link, Text } from "@radix-ui/themes";

export default function LinkItem({
  label,
  links,
}: {
  label: string;
  links: { url: string; link: string }[];
}) {
  return (
    <ProjectDetailItem label={label}>
      <Flex direction="column">
        {links.map(({ url, link }) => (
          <Text size="2" key={link} as="div">
            <Link href={url}>{link}</Link>
          </Text>
        ))}
      </Flex>
    </ProjectDetailItem>
  );
}
