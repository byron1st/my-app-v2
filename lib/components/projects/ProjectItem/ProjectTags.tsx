import { Badge, Flex } from "@radix-ui/themes";

export default function ProjectTags({ tags }: { tags: string[] }) {
  return (
    <Flex align="center" gap="1" wrap="wrap">
      {tags.map((tag) => (
        <Badge
          color={
            tag === "frontend"
              ? "blue"
              : tag === "backend"
                ? "orange"
                : tag === "cli-tool"
                  ? "brown"
                  : "amber"
          }
          key={tag}
        >
          {tag}
        </Badge>
      ))}
    </Flex>
  );
}
