import { Container, Flex, Separator } from "@radix-ui/themes";
import ProfileCard, { type Profile } from "@/lib/components/about/ProfileCard";
import Interests, { Interest } from "@/lib/components/about/Interest";
import Links, { MyLink } from "@/lib/components/about/Links";
import Site, { SiteSkill } from "@/lib/components/about/Site";

const profile: Profile = {
  name: "Hwi Ahn",
  careers: ["Fullstack Developer", "Computer Science Researcher"],
  introduction:
    "저는 Go, Node.js, React 기반의 웹서비스 개발을 주로 해온 풀스택 개발자입니다. 동시에 소프트웨어 아키텍처를 주제로 연구를 진행 중인 박사과정 연구원입니다.",
  sites: [
    { name: "GitHub", url: "https://github.com/byron1st" },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/hwiahn" },
    { name: "Velog", url: "https://velog.io/@byron1st" },
  ],
};

const interest: Interest = {
  developer: [
    "Go, TypeScript",
    "Hyperledger Fabric, Ethereum",
    "Fastify, Next.js, SvelteKit",
    "MongoDB",
    "React, Svelte",
  ],
  researcher: [
    "Software Engineering",
    "Software Architecture",
    "Software Architecture Reconstruction",
    "Static & Dynamic Analysis",
  ],
};

const myLinks: MyLink[] = [
  { name: "GitHub", url: "https://github.com/byron1st" },
  { name: "LinkedIn", url: "https://linkedin.com/in/hwiahn" },
  { name: "Velog", url: "https://velog.io/@byron1st" },
];

const siteSkills: SiteSkill[] = [
  { kind: "Server", value: "Next.js" },
  { kind: "UI Framework", value: "RadixUI Themes" },
  { kind: "Icons", value: "RadixUI Icons" },
  { kind: "Font", value: "Pretendard" },
  { kind: "Font (Mono)", value: "Jetbrains Mono" },
  { kind: "Hosting", value: "Vercel" },
  { kind: "Database", value: "MongoDB" },
];

export default function About() {
  return (
    <Container size="2" p="4">
      <Flex direction="column" gap="3">
        <ProfileCard profile={profile} />
        <Separator size="4" />
        <Interests interest={interest} />
        <Separator size="4" />
        <Links links={myLinks} />
        <Separator size="4" />
        <Site skills={siteSkills} />
      </Flex>
    </Container>
  );
}
