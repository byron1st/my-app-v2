export type Interest = {
  developer: string[];
  researcher: string[];
};

export type SiteSkill = { kind: string; value: string };

export type Profile = {
  name: string;
  careers: string[];
  introduction: string;
  sites: { name: string; url: string }[];
};
