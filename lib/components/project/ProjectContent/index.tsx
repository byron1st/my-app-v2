import "@/lib/components/project/ProjectContent/project-content.css";

export default function ProjectContent({ html }: { html: string }) {
  return (
    <div className="break-keep" dangerouslySetInnerHTML={{ __html: html }} />
  );
}
