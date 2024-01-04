import LinkItem from "@/lib/components/about/Links/LinkItem";
import SectionLayout from "@/lib/components/about/SectionLayout";
import {
  ExternalLinkIcon,
  GitHubLogoIcon,
  LinkedInLogoIcon,
} from "@radix-ui/react-icons";

export type MyLink = { name: string; url: string };

export default function Links({ links }: { links: MyLink[] }) {
  return (
    <SectionLayout title="Links">
      {links.map((link) => (
        <LinkItem
          site={link.name}
          url={link.url}
          Icon={
            link.name === "GitHub"
              ? GitHubLogoIcon
              : link.name === "LinkedIn"
                ? LinkedInLogoIcon
                : ExternalLinkIcon
          }
          key={link.name}
        />
      ))}
    </SectionLayout>
  );
}
