import { projects } from "@/lib/data";
import { Project } from "@/lib/types";
import ProjectDetail from "@/lib/components/project/ProjectDetail";
import ProjectHeader from "@/lib/components/project/ProjectHeader";
import BackButton from "@/lib/components/common/BackButton";

function getProject(projectId: string): Project {
  const project = projects.find((project) => project.id === projectId);
  if (!project) throw new Error("no such project");

  return project;
}

export default function Project({ params }: { params: { projectId: string } }) {
  const project = getProject(params.projectId);

  return (
    <>
      <BackButton target="projects" />
      <ProjectHeader project={project} />
      <ProjectDetail project={project} />
    </>
  );
}
