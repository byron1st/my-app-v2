"use client";

import { Button } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { ChevronLeftIcon } from "@radix-ui/react-icons";

export default function BackButton() {
  const router = useRouter();

  return (
    <Button onClick={router.back} variant="ghost">
      <ChevronLeftIcon />
      Back
    </Button>
  );
}
