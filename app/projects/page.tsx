import { useMemo } from "react";
import { Flex, Heading, Separator } from "@radix-ui/themes";
import ProjectsList from "@/lib/components/projects/ProjectsList";
import type { Project, ProjectStatus } from "@/lib/types";
import { projects } from "@/lib/data";

export default function Projects() {
  const filteredProjects: Record<ProjectStatus, Project[]> = useMemo(
    () =>
      projects.reduce(
        (filtered, project) => {
          filtered[project.status].push(project);
          return filtered;
        },
        {
          ongoing: [],
          hold: [],
          finished: [],
        } as Record<ProjectStatus, Project[]>,
      ),
    [],
  );

  return (
    <>
      <Heading mb="4">Projects</Heading>

      <Flex direction="column" gap="3">
        <ProjectsList projects={filteredProjects.ongoing} title="On-Going" />
        <Separator size="4" />
        <ProjectsList projects={filteredProjects.hold} title="Hold" />
        <Separator size="4" />
        <ProjectsList projects={filteredProjects.finished} title="Finished" />
      </Flex>
    </>
  );
}
