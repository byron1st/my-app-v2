import Image from "next/image";
import { Text, Flex, Heading, Link } from "@radix-ui/themes";
import type { Profile } from "@/lib/types";
import {
  ExternalLinkIcon,
  GitHubLogoIcon,
  LinkedInLogoIcon,
} from "@radix-ui/react-icons";
import ProfileSite from "@/lib/components/about/ProfileSite";

export default function ProfileCard({ profile }: { profile: Profile }) {
  return (
    <Flex gap="3">
      <Image
        src="/profile.jpg"
        alt="Profile Image"
        width={80}
        height={80}
        style={{ borderRadius: 99999 }}
      />

      <Flex direction="column" gap="2" width="100%">
        <Flex direction="column">
          <Flex align="end" gap="2">
            <Heading>{profile.name} </Heading>

            {profile.sites.map((site) => (
              <ProfileSite
                key={site.name}
                link={site.url}
                Icon={
                  site.name === "GitHub"
                    ? GitHubLogoIcon
                    : site.name === "LinkedIn"
                      ? LinkedInLogoIcon
                      : ExternalLinkIcon
                }
              />
            ))}
          </Flex>
          <Text weight="bold">{profile.careers.join(", ")}</Text>
        </Flex>

        <Flex direction="column">
          <Text weight="light" size="2">
            Blockchain Engineer @{" "}
            <Link
              href="https://42dot.ai"
              target="_blank"
              rel="noopener noreferrer"
            >
              42dot
            </Link>
          </Text>
          <Text weight="light" size="2">
            Ph.D in Computer Science @{" "}
            <Link
              href="https://kaist.ac.kr"
              target="_blank"
              rel="noopener noreferrer"
            >
              KAIST
            </Link>
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
