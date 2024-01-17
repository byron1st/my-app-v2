import { projects } from "@/lib/data";
import { Project } from "@/lib/types";
import ProjectBreadcrumb from "@/lib/components/project/ProjectBreadcrumb";
import ProjectDetail from "@/lib/components/project/ProjectDetail";
import ProjectHeader from "@/lib/components/project/ProjectHeader";

function getProject(projectId: string): Project {
  const project = projects.find((project) => project.id === projectId);
  if (!project) throw new Error("no such project");

  return project;
}

export default function Project({ params }: { params: { projectId: string } }) {
  const project = getProject(params.projectId);

  return (
    <>
      <ProjectBreadcrumb title={project.title} />
      <ProjectHeader project={project} />
      <ProjectDetail project={project} />
    </>
  );
}
