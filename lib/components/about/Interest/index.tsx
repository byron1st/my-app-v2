import InterestList from "@/lib/components/about/Interest/InterestList";
import SectionLayout from "@/lib/components/about/SectionLayout";

export type Interest = {
  developer: string[];
  researcher: string[];
};

export default function Interest({ interest }: { interest: Interest }) {
  return (
    <SectionLayout title="Interest">
      <InterestList title="As a developer..." list={interest.developer} />
      <InterestList title="As a researcher..." list={interest.researcher} />
    </SectionLayout>
  );
}
