import { Flex, Separator } from "@radix-ui/themes";
import ProfileCard from "@/lib/components/about/ProfileCard";
import Interests from "@/lib/components/about/Interest";
import Links from "@/lib/components/about/Links";
import Site from "@/lib/components/about/Site";
import { interest, myLinks, profile, siteSkills } from "@/lib/data";

export default function About() {
  return (
    <>
      <Flex direction="column" gap="3">
        <ProfileCard profile={profile} />
        <Separator size="4" />
        <Interests interest={interest} />
        <Separator size="4" />
        <Links links={myLinks} />
        <Separator size="4" />
        <Site skills={siteSkills} />
      </Flex>
    </>
  );
}
