export type ProjectStatus = "ongoing" | "hold" | "finished";

export type Project = {
  id: string;
  title: string;
  from: Date;
  to?: Date;
  status: ProjectStatus;
  kind: "work" | "research" | "personal";
  company?: string;
  description: string;
  tags: string[];
  skills: string[];

  // Detail
  detail?: {
    role: string;
    team: string;
    size: number;
    link?: string;
    repos?: string[];
    content?: string;
  };

  // Content
  content?: {
    overview: string[];
    challenges: { challenge: string; solution: string[] }[];
    techstacks: {
      kind: "frontend" | "backend" | "cli" | "desktop";
      stacks: string[];
    }[];
  };
};
