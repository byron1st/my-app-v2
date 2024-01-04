import Image from "next/image";
import { Text, Flex, Heading } from "@radix-ui/themes";

export type Profile = {
  name: string;
  careers: string[];
  introduction: string;
  sites: { name: string; url: string }[];
};

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

      <Flex direction="column">
        <Heading>{profile.name}</Heading>

        <Text weight="bold">{profile.careers.join(", ")}</Text>

        <Text weight="light" style={{ wordBreak: "keep-all" }}>
          {profile.introduction}
        </Text>
      </Flex>
    </Flex>
  );
}
