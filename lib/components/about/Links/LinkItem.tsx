import { Flex, Link, Tooltip } from "@radix-ui/themes";
import { IconProps } from "@radix-ui/react-icons/dist/types";
import { useMemo } from "react";

export default function LinkItem({
  site,
  url,
  Icon,
}: {
  site: string;
  url: string;
  Icon: React.ForwardRefExoticComponent<
    IconProps & React.RefAttributes<SVGSVGElement>
  >;
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
