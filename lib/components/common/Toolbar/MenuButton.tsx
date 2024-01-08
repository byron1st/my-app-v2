"use client";

import { Button } from "@radix-ui/themes";
import { usePathname, useRouter } from "next/navigation";
import { RadixIcon } from "@/lib/types";

export default function MenuButton({
  Icon,
  label,
  href,
}: {
  Icon: RadixIcon;
  label: string;
  href: string;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const isCurrent = pathname.startsWith(href);

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
