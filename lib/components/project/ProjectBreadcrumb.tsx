import { Text, Link } from "@radix-ui/themes";

export default function ProjectBreadcrumb({ title }: { title: string }) {
  return (
    <Text color="gray" size="1" weight="light">
      <Link underline="always" href="/projects">
        projects
      </Link>{" "}
      / {title}
    </Text>
  );
}
