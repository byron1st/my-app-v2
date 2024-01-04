import { Em, Flex, Text } from "@radix-ui/themes";
import SectionLayout from "@/lib/components/about/SectionLayout";
import SiteItem from "@/lib/components/about/Site/SiteItem";

export type SiteSkill = { kind: string; value: string };

export default function Site({ skills }: { skills: SiteSkill[] }) {
  return (
    <SectionLayout title="This Site">
      <Text size="2" mb="1">
        <Em>This site is built using...</Em>
      </Text>

      <Flex wrap="wrap" gap="1">
        {skills.map((skill) => (
          <SiteItem label={skill.kind} title={skill.value} key={skill.kind} />
        ))}
      </Flex>
    </SectionLayout>
  );
}
