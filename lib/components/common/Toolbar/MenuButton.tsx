"use client";

import { IconProps } from "@radix-ui/react-icons/dist/types";
import { Button } from "@radix-ui/themes";
import { usePathname, useRouter } from "next/navigation";

export default function MenuButton({
  Icon,
  label,
  href,
}: {
  Icon: React.ForwardRefExoticComponent<
    IconProps & React.RefAttributes<SVGSVGElement>
  >;
  label: string;
  href: string;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const isCurrent = pathname === href;

  const moveTo = () => {
    router.push(href);
  };

  return (
    <Button
      onClick={moveTo}
      color={isCurrent ? "indigo" : "gray"}
      variant={"ghost"}
      my={"1"}
      mx={"2"}
    >
      <Icon width={18} height={18} />
      {label}
    </Button>
  );
}
