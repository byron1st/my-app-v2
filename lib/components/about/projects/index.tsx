import SectionLayout from "@/lib/components/about/SectionLayout";
import { projects, selectedProjectIds } from "@/lib/data";
import { Flex, Heading, Link, Text } from "@radix-ui/themes";
import { useMemo } from "react";

export default function Projects() {
  const selectedProjects = useMemo(
    () =>
      selectedProjectIds.map((id) =>
        projects.find((project) => id === project.id),
      ),
    [],
  );

  return (
    <SectionLayout title="Past Projects">
      <Flex direction="column" gap="2">
        {selectedProjects.map((project) => (
          <Flex direction="column" key={project?.id}>
            <Heading size="2">
              <Link href={`/projects/${project?.id}`}>{project?.title}</Link>
            </Heading>
            <Text size="1" color="gray">
              {project?.description}
            </Text>
          </Flex>
        ))}
      </Flex>

      <Flex justify="end">
        <Link size="2" href="/projects">
          ...more
        </Link>
      </Flex>
    </SectionLayout>
  );
}
