"use client";

import { Button } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  const onBack = () => {
    router.back();
  };

  return <Button onClick={onBack}>Back</Button>;
}
