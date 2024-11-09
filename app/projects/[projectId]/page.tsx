import { projects } from "@/lib/data";
import ProjectDetail from "@/lib/components/project/ProjectDetail";
import ProjectHeader from "@/lib/components/project/ProjectHeader";
import BackButton from "@/lib/components/common/BackButton";
import type { Project } from "@/lib/types";

function getProject(projectId: string): Project {
  const project = projects.find((project) => project.id === projectId);
  if (!project) throw new Error("no such project");

  return project;
}

export default async function Project(props: {
  params: Promise<{ projectId: string }>;
}) {
  const params = await props.params;
  const project = getProject(params.projectId);

  return (
    <>
      <BackButton />
      <ProjectHeader project={project} />
      <ProjectDetail project={project} />
    </>
  );
}
