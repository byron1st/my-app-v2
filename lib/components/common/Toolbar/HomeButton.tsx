"use client";

import { HomeIcon } from "@radix-ui/react-icons";
import { IconButton } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

export default function HomeButton() {
  const router = useRouter();

  const moveTo = () => {
    router.push("/");
  };

  return (
    <IconButton variant="ghost" radius="full" onClick={moveTo} m="1">
      <HomeIcon width={18} height={18} />
    </IconButton>
  );
}
