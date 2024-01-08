import { BackpackIcon, CalendarIcon } from "@radix-ui/react-icons";
import { Card, Flex, Badge } from "@radix-ui/themes";
import dayjs from "dayjs";
import ProjectHeader from "@/lib/components/projects/ProjectItem/ProjectHeader";
import ProjectProperty from "@/lib/components/projects/ProjectItem/ProjectProperty";
import ProjectTags from "@/lib/components/projects/ProjectItem/ProjectTags";
import type { Project } from "@/lib/types";

export default function ProjectItem({ project }: { project: Project }) {
  return (
    <Card asChild>
      <a href={`/projects/${project.id}`}>
        <Flex direction="column" gap="2">
          <ProjectHeader
            title={project.title}
            description={project.description}
          />

          <ProjectTags tags={project.tags} />

          <Flex direction="column">
            <ProjectProperty
              Icon={CalendarIcon}
              value={`${dayjs(project.from).format("YYYY-MM")} ~ 
                ${
                  project.to ? dayjs(project.to).format("YYYY-MM") : "Present"
                }`}
            />

            <ProjectProperty
              Icon={BackpackIcon}
              value={
                project.kind === "work"
                  ? project.company ?? ""
                  : project.kind === "research"
                    ? "연구 프로젝트"
                    : "개인 프로젝트"
              }
            />
          </Flex>

          <Flex align="center" gap="1" wrap="wrap">
            {project.skills.map((skill) => (
              <Badge color="gray" key={skill}>
                #{skill}
              </Badge>
            ))}
          </Flex>
        </Flex>
      </a>
    </Card>
  );
}
