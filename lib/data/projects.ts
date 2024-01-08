import type { Project } from "@/lib/types";

export const projects: Project[] = [
  {
    id: "1",
    title: "개인 홈페이지",
    from: new Date("2023-03-01"),
    status: "ongoing",
    kind: "personal",
    description: "개인 홈페이지 개발",
    tags: ["frontend", "backend"],
    skills: ["Next.js", "TypeScript", "Vercel"],
    detail: {
      role: "프론트엔드(웹)/백엔드/운영/디자인",
      team: "개발자 1명",
      size: 1,
      link: "https://hwia.dev",
      repos: ["byron1st/my-app"],
    },
    content: {
      overview: [
        "여러 프론트엔드 기술들을 취미 삼아 적용시켜보기 위한 내 개인 홈페이지",
        "개인 정보와 프로젝트, 그리고 블로그 글들을 제공",
      ],
      challenges: [],
      techstacks: [
        {
          kind: "frontend",
          stacks: [
            "Next.js 기반 SSR 웹앱을 설계 및 개발하고, 이를 Vercel 에서 운영",
          ],
        },
      ],
    },
  },
  {
    id: "2",
    title: "Trust Data Connectome",
    from: new Date("2019-01-01"),
    to: new Date("2023-12-31"),
    status: "finished",
    kind: "work",
    company: "빅픽처랩(주)",
    description: "블록체인 기반의 개인 데이터 거래 플랫폼",
    tags: ["backend"],
    skills: [
      "Node.js",
      "Fastify",
      "Prisma",
      "TypeScript",
      "SQLite",
      "Ethereum",
      "Solidity",
      "Docker",
    ],
    detail: {
      role: "백엔드/운영",
      team: "개발자 1명",
      size: 12,
      repos: ["ydgcjh2019/tdc-connectors", "ydgcjh2019/tdc-dotls"],
    },
    content: {
      overview: [
        "블록체인을 기반으로 개인들이 자신의 민감 데이터(건강 등)를 직접 P2P 로 거래하는 개인데이터 거래 플랫폼",
        "거래 참여자들의 각자 개인 서버를 갖고 거래를 진행하는 구조",
      ],
      challenges: [
        {
          challenge: "비동기 커뮤니케이션 기반의 고도화된 분산구조",
          solution: [
            "UML Sequence 다이어그램을 활용, 매우 상세하게 비동기 커뮤니케이션을 설계",
            "모든 API 는 stateless 하게 설계",
          ],
        },
      ],
      techstacks: [
        {
          kind: "backend",
          stacks: [
            "DID 인증, ERC20/NFT 토큰 기반 개인 데이터 거래 기술 설계 및 개발",
            "Node.js(Fastify) 기반 RESTful API 서버 설계 및 개발",
            "SQLite 3 와 Prisma 를 이용하여 데이터 관리",
            "Firebase 이용 알림 관리",
            "ethers.js 를 이용하여 Ethereum 연동",
            "Docker 로 빌드 후 배포 및 운영",
          ],
        },
      ],
    },
  },
  {
    id: "3",
    title: "하이얼리",
    from: new Date("2022-01-01"),
    to: new Date("2023-12-31"),
    status: "finished",
    kind: "work",
    company: "빅픽처랩(주)",
    description: "상시채용 시대에 맞는 채용 인터뷰 및 평판조회 서비스",
    tags: ["frontend", "backend"],
    skills: ["Go", "MongoDB", "React", "Next.js", "Docker", "GCP"],

    detail: {
      role: "총괄/백엔드/프론트엔드(웹)/운영",
      team: "개발자 2~4명, 디자이너 1~2명, 기획자 1명",
      link: "https://www.hi-early.io/",
      size: 80,
    },
    content: {
      overview: [
        "상시채용 시대에 맞는 비대면 텍스트 기반 채용 인터뷰 서비스",
        "인터뷰 평가, 평판조회 결과를 익명화하여 높은 프라이버시를 제공",
        "인터뷰 질문들에 대한 토의 공간(커뮤니티) 제공",
      ],
      challenges: [
        {
          challenge:
            "지원자, 평가자, 평판조회 응답자 사이의 비동기 커뮤니케이션",
          solution: [
            "데이터의 생명주기를 상태 다이어그램 기반으로 설계, 시각화",
            "서버 API 는 stateless 하도록 구현",
          ],
        },
        {
          challenge:
            "권한(관리자, 일반사용자, 채용지원자, 평판평가자 등)에 따라 필요한 수많은 페이지",
          solution: [
            "권한 검사를 위한 공통 함수 제작",
            "React Context 를 활용하여 페이지 별로 필요한 데이터를 격리",
          ],
        },
        {
          challenge: "기획자, 디자이너들과의 커뮤니케이션",
          solution: [
            "디자인 시스템 구축에 적극적으로 참여 시킴",
            "회의 시 원활한 커뮤니케이션을 위한 대화 스킬 필요",
            "개발자도 기본적인 디자인 지식 학습",
          ],
        },
      ],
      techstacks: [
        {
          kind: "backend",
          stacks: [
            "Go 언어로 작성된 RESTful API 서버 설계 및 개발",
            "Google Cloud Platform 의 Cloud Run 에 배포 및 운영",
            "MongoDB 를 사용하고 MongoDB Atlas 에서 운영",
          ],
        },
        {
          kind: "frontend",
          stacks: [
            "Next.js 기반 SSR 웹앱을 설계 및 개발하고, 이를 Vercel 에서 운영",
            "Recoil, React Context, SWR 기반의 앱 상태 관리",
            "Stitches(CSS-in-JS 라이브러리)와 Radix UI 를 활용",
            "디자인 시스템을 구축하고, 이를 구현하여 UI 를 개발",
          ],
        },
      ],
    },
  },
  {
    id: "4",
    title: "CBSAR Toolset",
    from: new Date("2023-03-01"),
    to: new Date("2023-05-31"),
    status: "finished",
    kind: "research",
    description: "실행뷰 재구축을 위한 CBSAR 방법론 지원 도구 세트",
    tags: ["cli-tool"],
    skills: ["Rust", "MongoDB", "Svelte", "SvelteKit", "Java"],

    detail: {
      role: "개발",
      team: "개발자 1명",
      size: 1,
      repos: [
        "byron1st/sarex",
        "byron1st/mapping-rule-builder",
        "byron1st/JavaDependencyReader",
        "byron1st/js-dependencies-reader",
        "byron1st/go-dependencies-reader",
      ],
    },
    content: {
      overview: [
        "실행뷰 아키텍처 재구축을 위한 방법론 CBSAR을 지원하는 도구 세트",
        "CBSAR에서 메뉴얼하게 처리되기 어려운 부분을 자동화해주는 도구",
        "실험적인 성격의 도구들임",
      ],
      challenges: [],
      techstacks: [
        {
          kind: "cli",
          stacks: [
            "Rust 를 이용하여 통합된 CLI 도구를 개발",
            "의존관계 추출 부분은 플러그인으로 개발되어 CLI 도구에 통합될 수 있도록 처리",
          ],
        },
        {
          kind: "frontend",
          stacks: [
            "Svelte/SvelteKit 을 이용하여 GUI 도구를 개발",
            "로컬호스트로 실행하여, 브라우저를 통해 이용",
          ],
        },
      ],
    },
  },
  {
    id: "5",
    title: "이기종 블록체인 연동 서버",
    from: new Date("2022-07-01"),
    to: new Date("2023-05-31"),
    status: "finished",
    kind: "work",
    company: "빅픽처랩(주)",
    description:
      "서로 다른 블록체인들의 NFT 데이터를 읽어와서 유효성을 검증하는 미들웨어 서버",
    tags: ["backend"],
    skills: ["Node.js", "Fastify", "Ethereum", "Docker"],

    detail: {
      role: "백엔드",
      team: "개발자 2명",
      size: 2,
    },
    content: {
      overview: [
        "서로 다른 블록체인들의 NFT 데이터를 읽어와서 유효성을 검증",
        "조폐공사의 신뢰검증 플랫폼을 구성하는 다른 서버 및 데이터베이스와 연동",
      ],
      challenges: [
        {
          challenge:
            "향후 새롭게 추가될 수 있는 블록체인들이 있을 것을 염두에 두고 개발",
          solution: ["Factory 패턴을 이용하여 추가가 용이하도록 설계"],
        },
        {
          challenge:
            "통합 테스트의 어려움 (연동되는 블록체인, 플랫폼 내 다른 서버 및 데이터베이스에 대한 통제권이 나에게 없음)",
          solution: [
            "API 자체를 테스트를 염두에 두고 개발: 연동 부분을 함수로 injection",
            "테스트 시 Mock 객체 활용",
          ],
        },
      ],
      techstacks: [
        {
          kind: "backend",
          stacks: [
            "Node.js(Fastify) 기반 RESTful API 서버 설계 및 개발",
            "Ethereum, Klaytn, Polygon, OmniOne (라온시큐어), 조폐공사 자체 개발 블록체인(Hyperledger Fabric 기반) 연동 개발",
            "PostgreSQL 을 사용",
            "Docker 로 빌드하고, Jenkins CI 파이프라인에 통합",
            "Jest 를 이용하여 다수의 단위 테스트들 수행",
          ],
        },
      ],
    },
  },
  {
    id: "6",
    title: "잇닷",
    from: new Date("2018-05-01"),
    to: new Date("2021-12-31"),
    status: "finished",
    kind: "work",
    company: "빅픽처랩(주)",
    description: "블록체인 기반 익명 커뮤니케이션 서비스",
    tags: ["frontend", "backend"],
    skills: [
      "Go",
      "TypeScript",
      "React",
      "CRA",
      "React Native",
      "MongoDB",
      "Hyperledger Fabric",
      "Docker",
    ],

    detail: {
      role: "총괄/백엔드/프론트엔드(웹/모바일)/운영/디자인",
      team: "개발자 2~3명, 디자이너 0~1명",
      link: "https://www.bigpicturelabs.io/itdot",
      size: 68,
    },
    content: {
      overview: [
        "사용자가 개인 지갑을 이용하여, 블록체인 기반 인증을 통해 서비스를 익명으로 이용",
        "커뮤니티 활동 내역에 따라 보상 지급 시스템",
        "관리자가 보상, 게시판 등을 커스터마이징 가능",
        "대전시에서 약 1 년간 주민자치에 활용 (2021 년)",
      ],
      challenges: [
        {
          challenge:
            "블록체인 데이터의 느린 응답으로 인한 비동기 기반 커뮤니케이션 설계",
          solution: [
            "이벤트 기반으로 응답 처리, 커뮤니케이션 플로우 설계 시각화",
          ],
        },
        {
          challenge:
            "높은 수준의 커스터마이징 기능 제공으로 인한 데이터 구조 복잡도 증가",
          solution: [
            "ERD 모델을 지속적으로 최신화",
            "객체 임베딩 같은 MongoDB 데이터 구조의 유연성을 활용",
          ],
        },
        {
          challenge:
            "적은 개발자 숫자 대비 많은 프론트앤드 앱 제공 (웹, 모바일, 관리자 웹)",
          solution: ["공통 기능에 대한 라이브러리 공용화"],
        },
      ],
      techstacks: [
        {
          kind: "backend",
          stacks: [
            "마이크로서비스 아키텍처 기반의 백앤드 플랫폼 설계, 개발, 배포 및 운영",
            "Hyperledger Fabric 으로 프라이빗 블록체인 네트워크를 구축",
            "Node.js(Express) 기반 Hyperledger Fabric 연동 API 서버 구축",
            "MongoDB 를 주력 서비스 데이터베이스로 활용",
            "Docker Swarm 으로 2 ~ 6 대의 On-Promise 서버들에 배포 및 운영",
          ],
        },
        {
          kind: "frontend",
          stacks: [
            "CRA 기반 SPA 웹앱과 React Native 기반 모바일앱 개발 (TypeScript)",
            "Redux, React Context 기반의 앱 상태 관리",
            "디자인 시스템을 구축하고, Material UI 기반으로 구축 및 적용",
            "웹앱과 모바일앱 사이의 공통 로직(인증, 지갑, Hook, Context 등)을 공용 라이브러리로 구축",
          ],
        },
      ],
    },
  },
  {
    id: "7",
    title: "JRiExt2",
    from: new Date("2016-05-01"),
    to: new Date("2017-09-18"),
    status: "finished",
    kind: "research",
    description: "Java Runtime Information Extractor",
    tags: ["desktop-app"],
    skills: ["Java", "JavaScript", "Electron"],

    detail: {
      role: "개발",
      team: "개발자 1명",
      size: 1,
      repos: ["byron1st/jriext2", "byron1st/JRiExt2ManagerApp"],
    },
    content: {
      overview: [
        "2018년 발표된 실행뷰 아키텍처 재구축 논문의 내용을 지원하는 도구",
        "Java 프로그램에 Byte Code Instrumentation 기법을 이용하여, 로그 코드를 삽입",
        "실행 시 삽입된 로그 코드에서 아키텍처 재구축을 위한 로그를 생성",
      ],
      challenges: [],
      techstacks: [
        {
          kind: "desktop",
          stacks: [
            "Electron 을 이용하여 GUI를 제공하는 데스크톱 앱을 제작",
            "Java의 Byte Code Instrumentation 은 ASM 라이브러리를 이용하여 개발 후 Jar 로 빌드하여 Electron 기반 앱에 통합",
          ],
        },
      ],
    },
  },
];
