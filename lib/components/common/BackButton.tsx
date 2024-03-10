"use client";

import { Button } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { ChevronLeftIcon } from "@radix-ui/react-icons";

export default function BackButton({ target }: { target: string }) {
  const router = useRouter();

  const onBack = () => {
    router.push(`/${target}`);
  };

  return (
    <Button onClick={onBack} variant="ghost">
      <ChevronLeftIcon />
      Back to {target}
    </Button>
  );
}
