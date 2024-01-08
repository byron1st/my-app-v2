import { Flex, Link, Tooltip } from "@radix-ui/themes";
import { useMemo } from "react";
import { RadixIcon } from "@/lib/types";

export default function LinkItem({
  site,
  url,
  Icon,
}: {
  site: string;
  url: string;
  Icon: RadixIcon;
}) {
  const shortUrl = useMemo(() => url.slice("https://".length), [url]);

  return (
    <Flex gap="3" align="center">
      <Tooltip content={site}>
        <Icon width={18} height={18} />
      </Tooltip>

      <Link href={url}>{shortUrl}</Link>
    </Flex>
  );
}
