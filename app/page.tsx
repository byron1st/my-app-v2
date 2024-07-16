import { Flex, Link, Separator } from "@radix-ui/themes";
import ProfileCard from "@/lib/components/about/ProfileCard";
import Interests from "@/lib/components/about/Interest";
import Site from "@/lib/components/about/Site";
import { interest, profile, siteSkills } from "@/lib/data";
import Projects from "@/lib/components/about/projects";
import SectionLayout from "@/lib/components/about/SectionLayout";

export default function Home() {
  return (
    <>
      <Flex direction="column" gap="3">
        <ProfileCard profile={profile} />
        <Separator size="4" />

        <Interests interest={interest} />
        <Separator size="4" />

        <Projects />
        <Separator size="4" />

        <SectionLayout title="Posts">
          <Flex gap="1" align="end">
            <Link
              size="2"
              href="https://velog.io/@byron1st"
              target="_blank"
              rel="noopener noreferrer"
            >
              velog.io/@byron1st
            </Link>
          </Flex>
        </SectionLayout>
        <Separator size="4" />

        <Site skills={siteSkills} />
      </Flex>
    </>
  );
}
