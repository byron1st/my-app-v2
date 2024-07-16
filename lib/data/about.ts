import { Interest, Profile, SiteSkill } from "@/lib/types";

export const profile: Profile = {
  name: "Hwi Ahn",
  careers: ["Fullstack Software Developer specialized for Blockchain"],
  introduction:
    "블록체인 기반 웹 서비스의 백앤드, 프론트앤드 그리고 스마트 컨트랙트의 설계 및 개발 그리고 운영",
  sites: [
    { name: "LinkedIn", url: "https://www.linkedin.com/in/hwiahn" },
    { name: "GitHub", url: "https://github.com/byron1st" },
  ],
};

export const interest: Interest = {
  developer: ["Go, TypeScript, Move", "Aptos, Ethereum, Hyperledger Fabric"],
  researcher: ["Software Engineering", "Software Architecture"],
};

export const siteSkills: SiteSkill[] = [
  { kind: "Server", value: "Next.js" },
  { kind: "UI Framework", value: "RadixUI Themes" },
  { kind: "Icons", value: "RadixUI Icons" },
  { kind: "Font", value: "Noto Sans KR" },
  { kind: "Hosting", value: "Vercel" },
];
