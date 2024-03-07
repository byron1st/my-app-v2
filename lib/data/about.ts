import { Interest, MyLink, Profile, SiteSkill } from "@/lib/types";

export const profile: Profile = {
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

export const interest: Interest = {
  developer: [
    "Go, TypeScript, Move",
    "Aptos, Ethereum, Hyperledger Fabric",
    "Fastify, Next.js, React",
    "MongoDB",
  ],
  researcher: [
    "Software Engineering",
    "Software Architecture",
    "Software Architecture Reconstruction",
    "Static & Dynamic Analysis",
  ],
};

export const myLinks: MyLink[] = [
  { name: "GitHub", url: "https://github.com/byron1st" },
  { name: "LinkedIn", url: "https://linkedin.com/in/hwiahn" },
  { name: "Velog", url: "https://velog.io/@byron1st" },
];

export const siteSkills: SiteSkill[] = [
  { kind: "Server", value: "Next.js" },
  { kind: "UI Framework", value: "RadixUI Themes" },
  { kind: "Icons", value: "RadixUI Icons" },
  { kind: "Font", value: "Noto Sans KR" },
  { kind: "CMS", value: "Notion" },
  { kind: "Hosting", value: "Vercel" },
];
