import { Flex, Text, Grid, Em } from "@radix-ui/themes";
import ProjectItem from "@/lib/components/projects/ProjectItem";
import type { Project } from "@/lib/types";

export default function ProjectsList({
  projects,
  title,
}: {
  projects: Project[];
  title: string;
}) {
  return (
    <Flex direction="column" gap="2">
      <Text size="2">
        <Em>{title}</Em>
      </Text>

      {projects.length > 0 ? (
        <Grid columns={{ initial: "1", xs: "2", sm: "2" }} gap="2">
          {projects.map((project) => (
            <ProjectItem project={project} key={project.id} />
          ))}
        </Grid>
      ) : (
        <Flex width="100%" height="4" align="center" justify="center">
          <Text color="gray" size="1">
            Currently no project
          </Text>
        </Flex>
      )}
    </Flex>
  );
}
