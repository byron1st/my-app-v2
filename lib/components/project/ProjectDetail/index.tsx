import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { Badge, Flex } from "@radix-ui/themes";
import ProjectDetailItem from "@/lib/components/project/ProjectDetail/ProjectDetailItem";
import type { Project } from "@/lib/types";
import { useMemo } from "react";
import LinkItem from "@/lib/components/project/ProjectDetail/LinkItem";
import SimpleListItem from "@/lib/components/project/ProjectDetail/SimpleListItem";
import ListWithHeaderItem from "@/lib/components/project/ProjectDetail/ListWithHeaderItem";

dayjs.extend(duration);

export default function ProjectDetail({ project }: { project: Project }) {
  const duration = useMemo(
    () => getDuration(project.from, project.to),
    [project.from, project.to],
  );

  return (
    <Flex direction="column">
      <ProjectDetailItem label="Duration" value={duration} />
      <ProjectDetailItem
        label="Project kind"
        value={
          project.kind === "work"
            ? "회사 프로젝트"
            : project.kind === "research"
              ? "연구 프로젝트"
              : "개인 프로젝트"
        }
      />
      {project.company ? (
        <ProjectDetailItem label="Company" value={project.company} />
      ) : null}

      {project.detail ? (
        <>
          <ProjectDetailItem label="Team" value={project.detail.team} />
          <ProjectDetailItem label="Role" value={project.detail.role} />
          <ProjectDetailItem label="Size" value={`${project.detail.size}K`} />
          {project.detail.link ? (
            <LinkItem
              label="Link"
              links={[
                {
                  url: project.detail.link,
                  link: project.detail.link.slice(8),
                },
              ]}
            />
          ) : null}
          {project.detail.repos ? (
            <LinkItem
              label="Repositories"
              links={project.detail.repos.map((repo) => ({
                link: repo,
                url: `https://github.com/${repo}`,
              }))}
            />
          ) : null}
        </>
      ) : null}

      <ProjectDetailItem label="Skills">
        <Flex align="center" gap="1" wrap="wrap">
          {project.skills.map((skill) => (
            <Badge color="gray" key={skill}>
              #{skill}
            </Badge>
          ))}
        </Flex>
      </ProjectDetailItem>

      {project.content ? (
        <>
          <SimpleListItem label="Overview" list={project.content.overview} />
          {project.content.challenges.length > 0 ? (
            <ListWithHeaderItem
              label="Challenges"
              list={project.content.challenges.map(
                ({ challenge, solution }) => ({
                  header: challenge,
                  values: solution,
                }),
              )}
            />
          ) : null}
          <ListWithHeaderItem
            label="Techstacks"
            list={project.content.techstacks.map(({ kind, stacks }) => ({
              header:
                kind === "backend"
                  ? "백엔드"
                  : kind === "frontend"
                    ? "프론트엔드"
                    : kind === "cli"
                      ? "CLI 도구"
                      : kind === "desktop"
                        ? "데스크톱 앱"
                        : "",
              values: stacks,
            }))}
          />
        </>
      ) : null}
    </Flex>
  );
}

function getDuration(from: Date, to?: Date) {
  const fromDayjs = dayjs(from);
  const isPresent = !to;
  const toDayjs = to ? dayjs(to) : dayjs();

  return `${fromDayjs.format("YYYY년 MM월")} ~ ${
    isPresent ? "Present" : toDayjs.format("YYYY년 MM월")
  } (${dayjs.duration(toDayjs.diff(from)).format("Y년 M개월")})`;
}
