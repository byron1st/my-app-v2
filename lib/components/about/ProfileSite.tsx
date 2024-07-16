import { RadixIcon } from "@/lib/types";
import { Button } from "@radix-ui/themes";

export default function ProfileSite({
  link,
  Icon,
}: {
  link: string;
  Icon: RadixIcon;
}) {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer">
      <Button variant="ghost">
        <Icon width="18" height="18" />
      </Button>
    </a>
  );
}
